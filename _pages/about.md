---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/results/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

<div style="margin: 0 0 2em 0; display: inline-block; width: 100%;">
  <div style="text-align: center;">
    <div style="font-family: 'Trajan', serif; font-size: 22px; font-weight: bold; color: #333; line-height: 1.4; margin-bottom: 0.5em; display: inline-block; position: relative;">
      Die Grenzen meiner Sprache bedeuten die Grenzen meiner Welt.
      <div style="position: absolute; right: 0; top: 100%; margin-top: 0.5em; font-family: 'Trajan', serif; font-size: 16px; color: #666; font-style: italic; white-space: nowrap;">
        —— Ludwig Wittgenstein
      </div>
    </div>
  </div>
</div>

Hello, I'm **Yingpeng Ma (马英鹏)**. I'm currently an M.S. student in Computer Science at the **NLP^2CT Lab** <img src='./images/nlp2ct.png' style='width: 2em;'>, University of Macau (澳门大学), advised by [Prof. Derek F. Wong](https://www.fst.um.edu.mo/personal/derek-wong/). 

Previously, I was a Research Assistant at the **Westlake NLP Lab** <img src='./images/westlake_logo.png' style='width: 4em;'>, supervised by [Prof. Yue Zhang (张岳)](https://frcchang.github.io/) and [Prof. Linyi Yang (杨林易)](https://yanglinyi.github.io/). 

I earned my B.E. degree from **Northwestern Polytechnical University** (西北工业大学)  <img src='./images/nwpu_logo.png' style='width: 6em;'>, supervised by [Prof. Chunwei Tian (田春伟)](https://hellloxiaotian.github.io/). 

In addition to my advisors, I am also deeply indebted to the guidance and support of my senior labmates: [Jianhao Yan (颜建昊)](https://elliottyan.github.io/), [Dr. Yulong Chen (陈雨龙)](https://cylnlp.github.io/), [Runzhe Zhan (詹润哲)](https://runzhe.me/), and [Dr. Yafu Li (李雅夫)](https://yafuly.github.io/yafuly/). Their pursuit of excellence continues to motivate and guide my academic journey.

My research interests in **NLP** and **LLMs** are inspired by Wittgenstein's philosophy: **The limits of my language mean the limits of my world.**

For me, the quest to build Artificial General Intelligence is synonymous with the quest to transcend these very limits. To this end, my research is dedicated to building agents that possess greater **consistency, credibility, and intelligence**.

# 🗞 News
- *Apr 2025*: 🌟 My repository [**Awesome-Story-Generation**](https://github.com/yingpengma/Awesome-Story-Generation) has reached **400** stars! It's encouraging to see community interest in this topic. 😊
- *Jan 2025*: 🔥 One paper was accepted to the **COLING 2025** main conference.
- *Aug 2024*: 🔥 Excited to start my M.S. in Computer Science at the **University of Macau**!
- *May 2023*: 🎉🎉 One **co-first authored** paper was accepted to the **ACL 2023** main conference. Thrilled to have my first paper accepted and looking forward to future contributions!
- *Aug 2022*: Excited to learn at the **Westlake NLP Lab**, beginning my journey in NLP!
- *Jun 2022*: 🎉 Graduated with my B.E. degree from NWPU in just **three** years and received the **Excellent Graduation Thesis Award** (supervised by Prof. Chunwei Tian).

# 🌱 Repository
[ **[Awesome-Story-Generation](https://github.com/yingpengma/Awesome-Story-Generation)** ![](https://img.shields.io/github/stars/yingpengma/Awesome-Story-Generation?style=social&label=Stars) | **[FinTrust](https://github.com/yingpengma/FinTrust)** ![](https://img.shields.io/github/stars/yingpengma/FinTrust?style=social&label=Stars) ]


# 📘 Publication

<div class='paper-box' style='margin-top: -20px;'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">COLING 2025 Main</div>
      <img src='images/FocusNeuron.png' height="100%" width="100%">
    </div>
  </div>
  <div class='paper-box-text' markdown="1">
  <div style="font-weight: bold; color: #333;">Let's Focus on Neuron: Neuron-Level Supervised Fine-tuning for Large Language Model</div>

  Haoyun Xu\*, Runzhe Zhan\*, **Yingpeng Ma**, Derek F Wong, Lidia S Chao
  
  <a href='https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Qrghm1QAAAAJ&citation_for_view=Qrghm1QAAAAJ:qUcmZB5y_30C'><img src="https://img.shields.io/badge/dynamic/json?url={{ gsDataBaseUrl | append: 'google-scholar-stats/results/gs_data.json' | url_encode }}&label=citations&query=$.publications['Qrghm1QAAAAJ:qUcmZB5y_30C'].num_citations&labelColor=f6f6f6&color=9cf"></a> [[**Paper**](https://aclanthology.org/2025.coling-main.630/)]  [[**Code**](https://github.com/NLP2CT/NeFT)]
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">ACL 2023 Main</div>
      <img src='images/FinTrust.png' height="100%" width="100%">
    </div>
  </div>
  <div class='paper-box-text' markdown="1">
  <div style="font-weight: bold; color: #333;">Measuring Consistency in Text-based Financial Forecasting Models</div>
  
    
  Linyi Yang\*, **Yingpeng Ma\***, Yue Zhang
  
  <a href='https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Qrghm1QAAAAJ&citation_for_view=Qrghm1QAAAAJ:ZeXyd9-uunAC'><img src="https://img.shields.io/badge/dynamic/json?url={{ gsDataBaseUrl | append: 'google-scholar-stats/results/gs_data.json' | url_encode }}&label=citations&query=$.publications['Qrghm1QAAAAJ:ZeXyd9-uunAC'].num_citations&labelColor=f6f6f6&color=9cf"></a> [[**Paper**](https://aclanthology.org/2023.acl-long.769/)] [[**Code**](https://github.com/yingpengma/FinTrust)]
  </div>
</div>

___* denotes equal contribution___


# 🎓 Education
- *2024.08 - 2027.06(expected)*, **M.S. degree**, Computer Science, University of Macau (澳门大学)
- *2019.09 - 2022.06*, **B.E. degree**, Software Engineering, Northwestern Polytechnical University (西北工业大学)

# 👔 Experience
- *2024.08 - present*, **Master Student**, NLP^2CT Lab @ University of Macau
- *2023.02 - 2024.07*, **Research Assistant**, Westlake NLP Lab @ Westlake University
- *2022.08 - 2023.01*, **Intern**, Westlake NLP Lab @ Westlake University
- *2021.07 - 2022.07*, **Intern**, Perception Vision Group @ Northwestern Polytechnical University

# 🏆 Honor and Award
- *2022*, **Excellent Graduation Thesis Award** (rank 3/217), Northwestern Polytechnical University
- *2021*, **Excellent Student Award**, Northwestern Polytechnical University
- *2021*, **Second-Class Scholarship** (top 15%), Northwestern Polytechnical University
- *2020*, **National First Prize**, the 15th National University Students Intelligent Car Race

# 📨 Service
- **Conference Reviewer** : ARR-24, IJCAI-24
- **Journal Reviewer** : TALLIP

# 📡 Useful Resource
- [AI Conference Deadlines](http://aideadlines.org/?sub=ML,NLP): Countdowns to top NLP/ML/AI conference deadlines.
- [Global Equality for PhDs](https://github.com/zhijing-jin/nlp-phd-global-equality): Resources to promote global equality for PhDs in NLP/AI.

<!--
Writing Perfect Papers ([Bilibili](https://www.bilibili.com/video/BV18v411n7mr/?spm_id_from=333.999.0.0) | [Youtube](https://www.youtube.com/watch?v=nUnmQmOOG4E) | [Slides](https://iqua.ece.toronto.edu/papers/writing-perfect-papers-2021.pdf)): A long talk on writing "perfect papers" (by Prof. Baochun Li).
[Lilian Weng's Blog](https://lilianweng.github.io/): Lilian Weng's blog with broad learning notes about DL/NLP.
[Jay Alammar's Blog](https://jalammar.github.io/): Visualizations and animations for many language models (Transformer, BERT, etc).
 -->


<link href="../assets/css/timeline.css" rel='stylesheet' type='text/css'>
<div class="timeline">
    {% for exp in site.data.experience.experiences %}
    <li>
      {% if exp.category == "work" %}
      <div class="direction-l">
      {% else %}
      <div class="direction-r">
      {% endif %}
        <div class="flag-wrapper">
          <span class="flag">{{ exp.place }}</span>
          <span class="time-wrapper"><span class="time">{{ exp.time }}</span></span>
        </div>
        <div class="desc"><b>{{ exp.title }}</b> <br/> {{ exp.subtitle }}</div>
      </div>
    </li>
    {% endfor %}
</div>
