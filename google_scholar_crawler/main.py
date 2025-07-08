import time
import random
from scholarly import scholarly
import jsonpickle
import json
from datetime import datetime
import os

def get_author_data_with_retry(scholar_id, max_retries=3):
    """获取作者数据，带重试机制"""
    for attempt in range(max_retries):
        try:
            print(f"尝试获取学者数据... (第 {attempt + 1} 次)")
            
            # 添加随机延迟避免被识别为机器人
            delay = random.uniform(1, 3)
            time.sleep(delay)
            
            # 搜索作者
            author = scholarly.search_author_id(scholar_id)
            print("✓ 成功找到作者")
            
            # 添加延迟
            time.sleep(random.uniform(2, 4))
            
            # 填充作者信息
            scholarly.fill(author, sections=['basics', 'indices', 'counts', 'publications'])
            print("✓ 成功获取完整信息")
            
            return author
            
        except Exception as e:
            print(f"✗ 第 {attempt + 1} 次尝试失败: {str(e)}")
            if attempt < max_retries - 1:
                wait_time = (attempt + 1) * 10 + random.uniform(5, 15)
                print(f"等待 {wait_time:.1f} 秒后重试...")
                time.sleep(wait_time)
            else:
                print("所有重试都失败了")
                raise

def main():
    """主函数"""
    scholar_id = os.environ.get('GOOGLE_SCHOLAR_ID')
    if not scholar_id:
        print("错误: 未设置 GOOGLE_SCHOLAR_ID 环境变量")
        return
    
    print(f"开始获取 Google Scholar 数据，ID: {scholar_id}")
    
    try:
        # 获取作者数据
        author = get_author_data_with_retry(scholar_id)
        
        # 处理数据
        name = author['name']
        author['updated'] = str(datetime.now())
        author['publications'] = {v['author_pub_id']:v for v in author['publications']}
        
        print(f"成功获取 {name} 的数据")
        print(f"引用次数: {author.get('citedby', 'N/A')}")
        print(f"出版物数量: {len(author['publications'])}")
        
        # 创建输出目录
        os.makedirs('results', exist_ok=True)
        
        # 保存详细数据
        with open('results/gs_data.json', 'w', encoding='utf-8') as outfile:
            json.dump(author, outfile, ensure_ascii=False, indent=2)
        
        # 保存总引用的 shields.io 格式数据
        shieldio_data = {
            "schemaVersion": 1,
            "label": "citations",
            "message": f"{author.get('citedby', 0)}",
        }
        with open('results/gs_data_shieldsio.json', 'w', encoding='utf-8') as outfile:
            json.dump(shieldio_data, outfile, ensure_ascii=False, indent=2)
        
        print("✓ 数据已保存到 results/ 目录")
        
    except Exception as e:
        print(f"✗ 程序执行失败: {str(e)}")
        raise

if __name__ == "__main__":
    main()
