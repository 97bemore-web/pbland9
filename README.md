# PBLAND

한국어·영어 한 페이지 정적 사이트입니다. Astro 5로 만들고, Cloudflare Pages에 올리는 것을 기준으로 합니다.

## 실행

```sh
npm i
npm run dev
```

개발 서버는 `http://localhost:4321` 입니다. `/` 는 `/ko/` 로 넘어가고, 영어 페이지는 `/en/` 입니다.

프로덕션 빌드와 미리보기는 아래와 같습니다.

```sh
npm run build
npm run preview
```

빌드 결과는 `dist` 입니다. 이 폴더는 OneDrive 안에 있어서, 빌드가 기존 `dist` 를 지울 때 Node가 멈추는 경우가 있습니다. `npm run build` 는 그 전에 `dist` 를 먼저 지웁니다.

## 문구 고치기

화면의 문장은 컴포넌트가 아니라 `src/content/ui/` 에 있습니다.

- `src/content/ui/ko.json` — 한국어 (메뉴, 섹션 제목, 소개, 하는 일, 진행 단계, 버튼)
- `src/content/ui/en.json` — 영어

두 파일의 키 구조는 같아야 합니다. 키를 빼거나 이름을 잘못 쓰면 빌드가 실패하고, 어떤 필드가 빠졌는지 메시지가 납니다.

## 작업(포트폴리오) 추가·수정

프로젝트마다 파일 하나입니다. `src/content/projects/*.md`

프론트매터 예:

```md
---
title_ko: "한국어 제목"
title_en: "English title"
summary_ko: "한두 문장 설명."
summary_en: "One or two sentences."
order: 7
---
```

`order` 는 양의 정수이고, 다른 항목과 겹치면 안 됩니다. 숫자가 작은 것부터 나옵니다. 본문은 비워 두어도 됩니다. 제목이나 `order` 형식이 틀리면 빌드가 실패합니다.

## 도메인·이메일

아직 정해지지 않았습니다. 자리표시자는 `src/site.config.ts` 한 곳에만 있습니다.

- `email`: `contact@pbland.example`
- `domain`: `pbland.example`

버튼, 푸터, canonical, Open Graph, `robots.txt` 의 사이트맵 주소는 이 값을 읽습니다. `npm run dev` 또는 `npm run build` 를 실행하면 `public/robots.txt` 가 이 도메인으로 다시 써집니다. 전화번호와 주소는 넣지 않습니다.

## Cloudflare Pages

1. 이 폴더를 GitHub 저장소에 푸시합니다.
2. Cloudflare Pages에서 그 저장소를 연결합니다.
3. 프레임워크 프리셋은 Astro, 빌드 명령은 `npm run build`, 출력 디렉터리는 `dist` 입니다.
4. 어댑터는 필요 없습니다. 정적 파일만 배포합니다.
5. 커스텀 도메인을 연결한 뒤 `src/site.config.ts` 의 `domain` 과 `email` 을 실제 값으로 바꿉니다.

루트 `/` 는 기본 로케일인 `/ko/` 로 보냅니다. Astro가 만드는 메타 리프레시와 함께, Cloudflare용 `public/_redirects` 에 `/ /ko/ 302` 가 들어 있습니다.

## 팀 섹션

사람 이름이 확정되지 않아 팀 소개는 넣지 않았습니다. 나중에 넣으려면:

1. `src/content.config.ts` 에 `team` 컬렉션을 추가합니다. 예: `name`, `role_ko`, `role_en`, `order`.
2. `src/content/team/` 에 사람마다 마크다운 파일 하나를 만듭니다.
3. `src/content/ui/ko.json` 과 `en.json` 에 섹션 제목을 넣고, `src/components/HomePage.astro` 의 소개 다음에 섹션을 그립니다.

## CMS (선택)

지금은 파일을 직접 고칩니다. 나중에 Git 기반 CMS를 붙이려면 [Sveltia CMS](https://github.com/sveltia/sveltia-cms) 또는 [Decap CMS](https://decapcms.org/) 를 `/admin` 에 두면 됩니다. `src/content/ui/*.json` 과 `src/content/projects/*.md` 를 컬렉션으로 연결하면, 편집 내용이 커밋으로 남습니다.
