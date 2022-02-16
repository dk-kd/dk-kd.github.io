class ElmGenerator {
    initBody = () => {
        document.body.innerHTML += `
        <div class="container py-3">
            <div id="div_main"></div>
            <ul class="nav nav-pills nav-fill ul_nav" id="ul_nav">
                <li class="nav-item">
                    <a class="nav-link active a_nav" data-bs-toggle="tab" data-bs-target="#div_tab_home"
                        aria-controls="div_tab_home" aria-selected="true">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link a_nav" data-bs-toggle="tab" data-bs-target="#div_tab_profile"
                        aria-controls="div_tab_profile" aria-selected="false">Characters</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link a_nav" data-bs-toggle="tab" data-bs-target="#div_tab_story" aria-controls="div_tab_story"
                        aria-selected="false">Stories</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link a_nav" data-bs-toggle="tab" data-bs-target="#div_tab_musics" aria-controls="div_tab_musics"
                        aria-selected="false">Musics</a>
                </li>
            </ul>
            <div class="tab-content" id="tab_content">
                <div class="tab-pane fade show active" id="div_tab_home" role="tabpanel" aria-labelledby="home-tab">
                    <div id="content_about"></div>
                    <div id="carousel_about" class="carousel slide" data-bs-ride="carousel">
                        <div id="carousel_about_inner" class="carousel-inner" style="background-color: lightseagreen;">
                            
                        
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel_about"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel_about"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div class="tab-pane fade" id="div_tab_profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div id="content_profile"></div>
                </div>
                <div class="tab-pane fade" id="div_tab_story" role="tabpanel" aria-labelledby="story-tab">
                    <div id="content_main_story"></div>
                    <hr />
                    <span class="fs-4 fw-bold">メインストーリー後のイベント(ネタバレ含む)</span>
                    <a class="btn btn-sm btn-primary" data-bs-toggle="collapse" href="#collapse_event_stories" role="button" aria-expanded="false" aria-controls="collapse_event_stories">
                        開く
                    </a>
                    <div style="min-height:150px;">
                        <div class="collapse" id="collapse_event_stories"></div>
                    </div>
                </div>
                <div class="tab-pane fade" id="div_tab_musics" role="tabpanel" aria-labelledby="musics-tab"></div>
            </div>
            <div id="modal" class="modal fade" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal_title"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="ratio ratio-16x9">
                                <iframe id="modal_iframe" src="" frameborder="0" allowfullscreen></iframe>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    setBody = (arr) => {
        this.initBody();
        document.title = arr.main + "(" + arr.sub + ")";
        const div = document.getElementById("div_main");
        div.appendChild(createElm("h1", arr.main, "fs-1 fw-bold text-center"));
        div.appendChild(createElm("h2", arr.sub, "fs-2 fw-bold text-center"));
        div.appendChild(createElm("hr"));
    }
    setContentAbout = (arr, unit_name) => {
        const getCarouselItem = (link, is_active) => {
            const div = document.createElement("div");
            div.classList.add("carousel-item");
            if(is_active){
                div.classList.add("active");
            }
            const wrap = document.createElement("div");
            wrap.classList.add("img_carousel_wrap");
            const img = document.createElement("img");
            img.classList.add("img_carousel");
            img.src = link;
            wrap.appendChild(img);
            div.appendChild(wrap);
            console.log(div);
            return div;
        }
        const div = document.getElementById("content_about");
        const p = createElm("p", arr.description);
        p.innerHTML = p.innerHTML.replace(/\{0\}/g, "<b>" + unit_name + "(略称: " + arr.nickname + ")</b>");
        div.appendChild(p);
        const carousel_inner = document.getElementById("carousel_about_inner");
        carousel_inner.style.backgroundColor = arr.color;
        let is_active = true;
        for(let link of arr.images){
            carousel_inner.appendChild(getCarouselItem(link, is_active));
            is_active = false;
        }
    }
    setContentProfile = (arr) => {
        const getRow = (a) => {
            const row = document.createElement("div");
            row.classList.add("row");
            const col1 = document.createElement("div");
            col1.classList.add("col-md-6");
            const img_wrap = this.getImgWrapWithModalLink("自己紹介動画 (" + a.name + ")", a.link);
            col1.appendChild(img_wrap);
            row.appendChild(col1);
            const col2 = document.createElement("div");
            col2.classList.add("col-md-6");
            const div_profile_wrap = document.createElement("div");
            div_profile_wrap.classList.add("div_profile_wrap");
            const div_head = document.createElement("div");
            div_head.appendChild(createElm("span", a.name, "fs-5 fw-bold d-inline-block"));
            div_head.appendChild(createElm("span", "(" + a.rubi + ")", "fs-5 d-inline-block ps-2"));
            div_head.appendChild(createElm("span", "CV: " + a.cv, "fs-6 text-muted d-inline-block ps-2"));
            div_profile_wrap.appendChild(div_head);
            div_profile_wrap.appendChild(createElm("div", a.description, "mt-2"));
            col2.appendChild(div_profile_wrap);
            row.appendChild(col2);
            return row;
        }
        const div = document.getElementById("content_profile");
        for (let a of arr.sekai) {
            div.appendChild(getRow(a));
        }
    };
    setContentStory = (arr) => {
        const getRow = (tmp_arr) => {
            if(tmp_arr.length == 0){
                return createElm("div", "準備中", "text-muted");
            }
            const row = document.createElement("div");
            row.classList.add("row");
            for (let a of tmp_arr) {
                row.appendChild(getCol(a));
            }
            return row;
        }
        const getCol = (a) => {
            return this.getCardCol(a.title, a.link, a.description, createElm("div", a.title, "fs-5 fw-bold"));
        }
        const div = document.getElementById("content_main_story");
        const row = document.createElement("div");
        row.classList.add("row");
        const col1 = document.createElement("div");
        col1.classList.add("col-md-6");
        const img_wrap = this.getImgWrapWithModalLink("あらすじ紹介動画", arr.main.link);
        col1.appendChild(img_wrap);
        row.appendChild(col1);
        const col2 = document.createElement("div");
        col2.classList.add("col-md-6");
        const div_col2_wrap = document.createElement("div");
        div_col2_wrap.classList.add("div_col2_wrap");
        div_col2_wrap.appendChild(createElm("div", "メインストーリーのあらすじ", "fs-5 fw-bold"));
        div_col2_wrap.appendChild(createElm("div", arr.main.description, "mt-2"));
        col2.appendChild(div_col2_wrap);
        row.appendChild(col2);
        div.appendChild(row);
        div.appendChild(document.createElement("hr"));
        div.appendChild(createElm("h3", "メインストーリー注目シーン"));
        div.appendChild(getRow(arr.main.images));
        const div_events = document.getElementById("collapse_event_stories");
        div_events.appendChild(getRow(arr.events));
    }
    setContentMusic = (arr) => {
        const getRow = (tmp_arr) => {
            const row = document.createElement("div");
            row.classList.add("row");
            for (let a of tmp_arr) {
                row.appendChild(getCol(a));
            }
            return row;
        }
        const getCol = (a) => {
            const div_head = document.createElement("div");
            div_head.appendChild(createElm("span", a.title, "fw-bold fs-5"));
            div_head.appendChild(createElm("span", " / " + a.creator, "text-muted fs-6"));
            return this.getCardCol(a.title, a.link,"『" + a.caption + "』\n", div_head);
        }
        const div = document.getElementById("div_tab_musics");
        div.appendChild(createElm("h3", "書き下ろし曲 PickUp"));
        div.appendChild(getRow(arr.original));
        div.appendChild(createElm("h3", "カバー曲 PickUp"));
        div.appendChild(getRow(arr.cover));
    }
    getImgWrapWithModalLink = (title, link) => {
        const img_wrap = document.createElement("div");
        img_wrap.classList.add("img_wrap");
        const img = this.getImgWithModalLink(title, link);
        img_wrap.appendChild(img);
        return img_wrap;
    }
    getImgWithModalLink = (title, link) => {
        const a = document.createElement("a");
        a.classList.add("a_modal");
        a.setAttribute("data-bs-toggle", "modal");
        a.setAttribute("data-bs-target", "#modal");
        a.setAttribute("data-title", title);
        a.setAttribute("data-youtube-link", link);
        const img = document.createElement("img");
        img.src = this.getYouTubeThumbnailLink(link);
        a.appendChild(img);
        return a;
    };
    getYouTubeId = (v_link) => {
        return v_link.split("?")[1].split("=")[1];
    };
    getYouTubeThumbnailLink = (v_link) => {
        return "https://img.youtube.com/vi/" + this.getYouTubeId(v_link) + "/sddefault.jpg";
    };
    getYouTubeEmbedLink = (v_link) => {
        return "https://www.youtube.com/embed/" + this.getYouTubeId(v_link) + "?rel=0";
    };

    getCardCol = (title, link, description, div_head = null) => {
        const col1 = document.createElement("div");
        col1.classList.add("col-md-6", "py-3");
        const card = document.createElement("div");
        card.classList.add("card");
        const c_wrap = document.createElement("div");
        const img_wrap = document.createElement("div");
        img_wrap.classList.add("img_wrap", "img_in_card");
        if(isYouTubeLink(link)){
            img_wrap.appendChild(this.getImgWithModalLink(title, link));    
        }
        else{
            const img = document.createElement("img");
            img.src = link;
            img_wrap.appendChild(img);
        }
        c_wrap.appendChild(img_wrap);
        card.appendChild(c_wrap);
        const card_text = document.createElement("div");
        card_text.classList.add("card-text");
        const div_col2_wrap = document.createElement("div");
        div_col2_wrap.classList.add("div_col2_wrap", "div_in_card");
        if(div_head != null){
            div_col2_wrap.appendChild(div_head);
        }
        div_col2_wrap.appendChild(createElm("div", description, "mt-2"));
        card_text.appendChild(div_col2_wrap);
        card.appendChild(card_text);
        col1.appendChild(card);
        return col1;
    }

    constructor(a) {
        this.setBody(a.title);
        this.setContentAbout(a.about, a.title.main);
        this.setContentProfile(a.profiles);
        this.setContentStory(a.stories);
        this.setContentMusic(a.musics);

        document.getElementById("modal").addEventListener("show.bs.modal", (e) => {
            const btn = e.relatedTarget;
            const link = btn.getAttribute("data-youtube-link");
            console.log(link);
            const title = btn.getAttribute("data-title");
            if (typeof (title) == "string") {
                document.getElementById("modal_title").innerText = title;
            }
            $("#modal_iframe").attr("src", eg.getYouTubeEmbedLink(link));
        });
        document.getElementById("modal").addEventListener("hidden.bs.modal", (e) => {
            document.getElementById("modal_title").innerText = "";
            $("#modal_iframe").attr("src", "");
        });
    }
}
const createElm = (tag, text = null, className = null) => {
    const elm = document.createElement(tag);
    if (text != null) {
        elm.innerText = text;
    }
    if (className != null) {
        elm.className = className;
    }
    return elm;
}
const isYouTubeLink = (link) => {
    return link.indexOf("https://www.youtube.com") == 0;
}