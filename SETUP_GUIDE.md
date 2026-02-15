# 🚀 GitHub Pages 블로그 셋업 가이드

> Jekyll + GitHub Pages로 개인 블로그를 만드는 단계별 가이드입니다.

---

## 📋 사전 준비

### 1. 필수 도구 설치

**Ruby 설치** (Jekyll은 Ruby 기반입니다)

```bash
# macOS (Homebrew)
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Ubuntu/Debian
sudo apt-get install ruby-full build-essential

# Windows → https://rubyinstaller.org/ 에서 설치
```

**Jekyll & Bundler 설치**

```bash
gem install jekyll bundler
```

**Git 설치** (아직 없다면)

```bash
# macOS
brew install git

# Ubuntu
sudo apt-get install git
```

---

## 🏗️ Step 1: GitHub Repository 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단 **+** → **New repository** 클릭
3. Repository 이름을 **`username.github.io`** 로 설정
   - `username`은 본인의 GitHub 사용자명
   - 예: `sungwon.github.io`
4. **Public** 선택
5. **Create repository** 클릭

> ⚠️ Repository 이름이 정확히 `username.github.io` 형식이어야 GitHub Pages가 자동으로 활성화됩니다.

---

## 📁 Step 2: 블로그 템플릿 적용

### 방법 A: 제공된 템플릿 사용 (권장)

```bash
# 1. Repository 클론
git clone https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
cd YOUR_USERNAME.github.io

# 2. 제공된 blog-template.zip 압축 해제 후 파일 복사
#    (다운로드한 zip 파일을 이 폴더에 풀어주세요)

# 3. 의존성 설치
bundle install

# 4. 로컬 서버 실행해서 확인
bundle exec jekyll serve
# → 브라우저에서 http://localhost:4000 접속
```

### 방법 B: 처음부터 생성

```bash
jekyll new YOUR_USERNAME.github.io
cd YOUR_USERNAME.github.io
bundle install
bundle exec jekyll serve
```

---

## ⚙️ Step 3: 설정 커스터마이징

`_config.yml` 파일을 열어 다음 항목들을 수정하세요:

```yaml
# 사이트 기본 정보
title: "내 블로그 이름"
description: "블로그 설명"
url: "https://YOUR_USERNAME.github.io"

# 작성자 정보
author:
  name: "이름"
  bio: "한줄 소개"
  email: "이메일"
  github: "GitHub 사용자명"
```

---

## ✍️ Step 4: 포스트 작성하기

### 파일 규칙

포스트는 `_posts/` 폴더에 아래 형식으로 저장합니다:

```
_posts/YYYY-MM-DD-제목.md
```

예: `_posts/2026-02-15-my-first-post.md`

### 포스트 구조

```markdown
---
layout: post
title: "포스트 제목"
date: 2026-02-15
category: tech          # tech 또는 food
tags: [태그1, 태그2]
subtitle: "부제목 (선택사항)"
image: /assets/images/my-image.jpg  # 대표 이미지 (선택사항)
---

여기에 본문을 작성합니다.
Markdown 문법을 사용할 수 있습니다.

## 소제목

일반 텍스트, **굵은 글씨**, *기울임* 등

### 코드 블록

​```python
print("Hello, Blog!")
​```

### 이미지 삽입

![이미지 설명](/assets/images/photo.jpg)

### 인용

> 인용문은 이렇게 작성합니다.
```

### 카테고리별 분류

- **Tech 포스트**: `category: tech` → 🧬 Tech & Research 섹션에 표시
- **Food 포스트**: `category: food` → 🍽️ Food & Travel 섹션에 표시

---

## 🖼️ Step 5: 이미지 관리

이미지는 `assets/images/` 폴더에 저장합니다:

```
assets/
  images/
    2026-02-15-post-name/
      hero.jpg        # 대표 이미지
      screenshot1.png # 본문 이미지
```

포스트에서 참조:

```markdown
# Front matter에서
image: /assets/images/2026-02-15-post-name/hero.jpg

# 본문에서
![설명](/assets/images/2026-02-15-post-name/screenshot1.png)
```

> 💡 **팁**: 이미지는 가로 1200px 이하, 용량 500KB 이하로 최적화하세요.
> [TinyPNG](https://tinypng.com) 같은 서비스를 활용하면 좋습니다.

---

## 🚢 Step 6: 배포하기

```bash
# 1. 변경사항 스테이징
git add .

# 2. 커밋
git commit -m "블로그 초기 셋업"

# 3. 푸시
git push origin main
```

푸시 후 1~2분 내에 `https://YOUR_USERNAME.github.io`에서 블로그가 보입니다.

### GitHub Actions 확인

배포 상태는 GitHub repository → **Actions** 탭에서 확인할 수 있습니다.
초록색 체크가 뜨면 성공입니다.

---

## 🎨 Step 7: 추가 커스터마이징

### 커스텀 도메인 연결 (선택)

1. 도메인 구매 (Cloudflare, Namecheap 등)
2. Repository root에 `CNAME` 파일 생성:
   ```
   blog.yourdomain.com
   ```
3. DNS 설정에서 CNAME 레코드 추가:
   - `blog` → `YOUR_USERNAME.github.io`
4. Repository Settings → Pages → Custom domain에 도메인 입력
5. **Enforce HTTPS** 체크

### Google Analytics 추가

`_includes/header.html`의 `<head>` 섹션에 GA 태그를 추가하면 됩니다.

### 댓글 기능 (Utterances 추천)

GitHub Issues 기반 댓글 시스템인 [Utterances](https://utteranc.es/)를 추천합니다:

```html
<!-- _includes/comments.html 생성 후 post.html에 포함 -->
<script src="https://utteranc.es/client.js"
  repo="YOUR_USERNAME/YOUR_USERNAME.github.io"
  issue-term="pathname"
  theme="github-light"
  crossorigin="anonymous"
  async>
</script>
```

---

## 📂 블로그 디렉토리 구조

```
your-blog/
├── _config.yml          # 사이트 설정
├── _layouts/            # 레이아웃 템플릿
│   ├── default.html     # 기본 레이아웃
│   ├── post.html        # 포스트 레이아웃
│   └── category.html    # 카테고리 레이아웃
├── _includes/           # 재사용 컴포넌트
│   ├── header.html      # 헤더 (네비게이션)
│   └── footer.html      # 푸터
├── _posts/              # 블로그 포스트 (여기에 글 작성)
│   ├── 2026-01-20-kyoto-food-trip.md
│   ├── 2026-02-08-sejong-burger.md
│   ├── 2026-02-10-rna-aging-clock.md
│   └── 2026-02-14-geroagent-intro.md
├── assets/
│   ├── css/
│   │   └── main.css     # 스타일시트
│   └── images/          # 이미지 저장 폴더
├── tech/
│   └── index.html       # Tech 카테고리 페이지
├── food/
│   └── index.html       # Food 카테고리 페이지
├── about.md             # About 페이지
├── index.html           # 홈페이지
├── Gemfile              # Ruby 의존성
├── .gitignore           # Git 무시 파일
└── README.md
```

---

## 🔧 자주 쓰는 명령어

| 명령어 | 설명 |
|--------|------|
| `bundle exec jekyll serve` | 로컬 서버 실행 (localhost:4000) |
| `bundle exec jekyll serve --drafts` | 초안 포함 실행 |
| `bundle exec jekyll build` | 정적 파일 빌드만 |
| `git add . && git commit -m "메시지" && git push` | 변경사항 배포 |

---

## ❓ 트러블슈팅

**Q: 로컬에서는 잘 보이는데 GitHub에서 안 보여요**
→ `_config.yml`의 `url`과 `baseurl` 설정을 확인하세요.

**Q: 새 포스트가 안 나타나요**
→ 파일명이 `YYYY-MM-DD-title.md` 형식인지, `date`가 미래 날짜가 아닌지 확인하세요.

**Q: CSS가 적용 안 돼요**
→ `_config.yml`의 `baseurl` 설정과 CSS 경로가 일치하는지 확인하세요.

**Q: 빌드 에러가 나요**
→ `bundle exec jekyll build --trace`로 상세 에러를 확인하세요.
