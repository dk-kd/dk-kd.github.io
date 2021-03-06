class ElmGenerator {
    initBody = () => {
        document.body.innerHTML += `
        <div class="container py-3">
            <div id="div_main"></div>
            <hr />
            <div id="content_about"></div>
            <ul class="nav nav-pills nav-fill ul_nav" id="ul_nav">
                <li class="nav-item">
                    <a class="nav-link active a_nav" data-bs-toggle="tab" data-bs-target="#div_tab_profile"
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
                <div class="tab-pane fade" id="div_tab_home" role="tabpanel" aria-labelledby="home-tab">
                    <div id="carousel_about" class="carousel slide" data-bs-ride="carousel">
                        <div id="carousel_about_inner" class="carousel-inner" style="background-color: lightseagreen;"></div>
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
                <div class="tab-pane fade show active" id="div_tab_profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div id="content_profile"></div>
                </div>
                <div class="tab-pane fade" id="div_tab_story" role="tabpanel" aria-labelledby="story-tab">
                    <div id="content_main_story"></div>
                    <hr />
                    <div id="div_event_stories_menu" class="d-flex align-items-center">
                        <span class="fs-4 fw-bold">??????????????????????????????????????????(??????????????????)</span>
                        <a class="btn btn-sm btn-primary" data-bs-toggle="collapse" href="#collapse_event_stories" role="button" aria-expanded="false" aria-controls="collapse_event_stories">
                            ??????
                        </a>
                    </div>
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
            return div;
        }
        const div = document.getElementById("content_about");
        const p = createElm("p", arr.description);
        p.innerHTML = p.innerHTML.replace(/\{0\}/g, "<b>" + unit_name + "(??????: " + arr.nickname + ")</b>");
        div.appendChild(p);
        if(typeof arr.images != "undefined"){
            const carousel_inner = document.getElementById("carousel_about_inner");
            carousel_inner.style.backgroundColor = arr.color;
            let is_active = true;
            for(let link of arr.images){
                carousel_inner.appendChild(getCarouselItem(link, is_active));
                is_active = false;
            }
        }
    }
    setContentProfile = (arr) => {
        const getRow = (a, is_sekai) => {
            const row = document.createElement("div");
            row.classList.add("row");
            const col1 = document.createElement("div");
            col1.classList.add("col-md-6");
            col1.appendChild(this.getImgWrapWithModalLink("?????????????????? (" + a.name + ")", a.link));
            row.appendChild(col1);
            const col2 = document.createElement("div");
            col2.classList.add("col-md-6");
            const div_profile_wrap = document.createElement("div");
            div_profile_wrap.classList.add("div_profile_wrap");
            const div_head = document.createElement("div");
            div_head.appendChild(createElm("span", a.name, "fs-5 fw-bold d-inline-block"));
            if(is_sekai){
                div_head.appendChild(createElm("span", "(" + a.rubi + ")", "fs-5 d-inline-block ps-2"));
                div_head.appendChild(createElm("span", "CV: " + a.cv, "fs-6 text-muted d-inline-block ps-2"));
            }
            div_profile_wrap.appendChild(div_head);
            div_profile_wrap.appendChild(createElm("div", a.description, "mt-2"));
            col2.appendChild(div_profile_wrap);
            row.appendChild(col2);
            return row;
        }
        const div = document.getElementById("content_profile");
        div.appendChild(createElm("h4", "????????????????????????","mt-2"));
        for (let a of arr.sekai) {
            div.appendChild(getRow(a, true));
        }
        if(typeof arr.virtual != "undefined"){
            div.appendChild(document.createElement("hr"));
            div.appendChild(createElm("h4", "??????????????????????????????","mt-2"));
            div.appendChild(getRow(arr.virtual, false));
        }
    };
    setContentStory = (arr) => {
        const getRow = (tmp_arr) => {
            if(tmp_arr.length == 0){
                return createElm("div", "?????????", "text-muted");
            }
            const row = document.createElement("div");
            row.classList.add("row");
            for (let a of tmp_arr) {
                row.appendChild(getCol(a));
            }
            return row;
        }
        const getCol = (a) => {
            return this.getCardCol(a.title, a.link, a.description, createElm("div", a.title, "fs-5 fw-bold"), a.audio);
        }
        const div = document.getElementById("content_main_story");
        const row = document.createElement("div");
        row.classList.add("row");
        const col1 = document.createElement("div");
        col1.classList.add("col-md-6");
        const img_wrap = this.getImgWrapWithModalLink("????????????????????????", arr.main.link);
        col1.appendChild(img_wrap);
        row.appendChild(col1);
        const col2 = document.createElement("div");
        col2.classList.add("col-md-6");
        const div_col2_wrap = document.createElement("div");
        div_col2_wrap.classList.add("div_col2_wrap");
        div_col2_wrap.appendChild(createElm("div", arr.main.caption ?? "???????????????????????????????????????", "fs-5 fw-bold"));
        div_col2_wrap.appendChild(createElm("div", arr.main.description, "mt-2"));
        col2.appendChild(div_col2_wrap);
        row.appendChild(col2);
        div.appendChild(row);
        div.appendChild(document.createElement("hr"));
        div.appendChild(createElm("h3", "???????????????????????? PickUp"));
        div.appendChild(getRow(arr.main.images));
        if(arr.events.length){
            const div_events = document.getElementById("collapse_event_stories");
            div_events.appendChild(getRow(arr.events));
        }
        else{
            const div_events_menu = document.getElementById("div_event_stories_menu");
            div_events_menu.classList.remove("d-flex");
            div_events_menu.classList.add("d-none");
        }
    }
    setContentMusic = (arr) => {
        const getRow = (tmp_arr, is_original) => {
            const row = document.createElement("div");
            row.classList.add("row");
            for (let a of tmp_arr) {
                row.appendChild(getCol(a, is_original));
            }
            return row;
        }
        const getCol = (a, is_original) => {
            const div_head = document.createElement("div");
            div_head.appendChild(createElm("span", a.title, "fw-bold fs-5"));
            div_head.appendChild(createElm("span", " / " + a.creator, "text-muted fs-6"));
            const caption = is_original ? "???" + a.caption + "???" : "???" + a.caption + "???"
            return this.getCardCol(a.title, a.link, caption, div_head);
        }
        const div = document.getElementById("div_tab_musics");
        div.appendChild(createElm("h3", "?????????????????? PickUp"));
        div.appendChild(getRow(arr.original, true));
        div.appendChild(createElm("h3", "???????????? PickUp"));
        div.appendChild(getRow(arr.cover, false));
    }
    getImgWrapWithModalLink = (title, link, note = null) => {
        const img_wrap = document.createElement("div");
        img_wrap.classList.add("img_wrap");
        if(isYouTubeLink(link)){
            img_wrap.appendChild(this.getImgWithModalLink(title, link, note));
        }
        else{
            const img = document.createElement("img");
            img.src = link;
            img_wrap.appendChild(img);
        }
        return img_wrap;
    }
    getImgWithModalLink = (title, link, note = null) => {
        const a = document.createElement("a");
        a.classList.add("a_modal");
        a.setAttribute("data-bs-toggle", "modal");
        a.setAttribute("data-bs-target", "#modal");
        a.setAttribute("data-title", title);
        a.setAttribute("data-youtube-link", link);
        const img = document.createElement("img");
        img.src = this.getYouTubeThumbnailLink(link);
        a.appendChild(img);
        const div_icon = document.createElement("div");
        div_icon.classList.add("img_wrap_icon");
        const i = document.createElement("i");
        i.classList.add("fab", "fa-youtube");
        div_icon.appendChild(i);
        if(note != null){
            const div_note = document.createElement("div");
            div_note.innerText = note;
            div_icon.appendChild(div_note);
        }
        a.appendChild(div_icon);
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

    getCardCol = (title, link, description, div_head, audio_src) => {
        const col1 = document.createElement("div");
        col1.classList.add("col-md-6", "py-3");
        const card = document.createElement("div");
        card.classList.add("card", "h-100");
        const c_wrap = document.createElement("div");
        const img_wrap = this.getImgWrapWithModalLink(title, link);
        img_wrap.classList.add("img_in_card");
        c_wrap.appendChild(img_wrap);
        card.appendChild(c_wrap);
        const card_text = document.createElement("div");
        card_text.classList.add("card-text");
        const div_col2_wrap = document.createElement("div");
        div_col2_wrap.classList.add("div_col2_wrap", "div_in_card");
        if(typeof div_head != "undefined"){
            div_col2_wrap.appendChild(div_head);
        }
        div_col2_wrap.appendChild(createElm("div", description, "mt-2"));
        if(typeof audio_src != "undefined"){
            const audio = document.createElement("audio");
            audio.controls = true;
            const source = document.createElement("source");
            source.src = audio_src;
            audio.appendChild(source);
            div_col2_wrap.appendChild(audio);
        }
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