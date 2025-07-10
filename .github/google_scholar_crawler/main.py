import requests
import json
import os
from datetime import datetime

def get_scholar_data():
    """使用SerpAPI获取Google Scholar数据"""
    api_key = os.environ['SERPAPI_KEY']
    scholar_id = 'Qrghm1QAAAAJ'  # 直接硬编码，无需secret
    
    # SerpAPI请求参数
    params = {
        'engine': 'google_scholar_author',
        'author_id': scholar_id,
        'api_key': api_key,
        'hl': 'en'
    }
    
    print(f"🔍 正在获取Google Scholar数据 (ID: {scholar_id})")
    
    response = requests.get('https://serpapi.com/search', params=params, timeout=60)
    
    if response.status_code != 200:
        raise Exception(f"SerpAPI请求失败，状态码: {response.status_code}")
    
    data = response.json()
    
    if 'error' in data:
        raise Exception(f"SerpAPI错误: {data['error']}")
    
    # 提取作者信息
    author = data.get('author', {})
    name = author.get('name', '')
    
    # 提取引用统计
    cited_by = data.get('cited_by', {})
    total_citations = 0
    
    if 'table' in cited_by and cited_by['table']:
        # 从table中提取总引用数
        for item in cited_by['table']:
            if 'citations' in item:
                total_citations = item['citations'].get('all', 0)
                break
    
    # 提取论文列表
    articles = data.get('articles', [])
    publications = {}
    
    for article in articles:
        citation_id = article.get('citation_id', '')
        if citation_id:
            publications[citation_id] = {
                'author_pub_id': citation_id,
                'title': article.get('title', ''),
                'num_citations': article.get('cited_by', {}).get('value', 0),
                'year': article.get('year', ''),
                'authors': article.get('authors', ''),
                'publication': article.get('publication', '')
            }
    
    # 构建兼容格式的数据结构
    result = {
        'name': name,
        'citedby': total_citations,
        'publications': publications,
        'updated': str(datetime.now()),
        'affiliations': author.get('affiliations', ''),
        'email': author.get('email', ''),
        'interests': author.get('interests', [])
    }
    
    return result

def save_data():
    """保存数据到JSON文件"""
    os.makedirs('results', exist_ok=True)
    
    data = get_scholar_data()
    
    print(f"✅ 获取成功:")
    print(f"   - 姓名: {data['name']}")
    print(f"   - 总引用数: {data['citedby']}")
    print(f"   - 论文数量: {len(data['publications'])}")
    
    # 保存详细数据
    with open('results/gs_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    # 保存shields.io格式数据
    shields_data = {
        "schemaVersion": 1,
        "label": "citations",
        "message": f"{data['citedby']}"
    }
    
    with open('results/gs_data_shieldsio.json', 'w', encoding='utf-8') as f:
        json.dump(shields_data, f, ensure_ascii=False, indent=2)
    
    print(f"📁 数据已保存到 results/ 目录")

if __name__ == "__main__":
    try:
        save_data()
        print("🎉 任务成功完成！")
    except Exception as e:
        print(f"❌ 更新失败: {str(e)}")
        import traceback
        traceback.print_exc()
        exit(1) 