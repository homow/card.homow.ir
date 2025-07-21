import * as info from "/data.js";

const textBodyElem = document.querySelectorAll(".bodyTranslate")
const menuLinks = document.querySelectorAll(".menu-items a")
const linksIcon = document.querySelectorAll(".menu-items a .fa-arrow-up-right-from-square")
const headerContainer = document.querySelector(".header-container")
const contactWrapper = document.querySelector(".contact")
const langBtn = document.getElementById("lang")
const text = langBtn.querySelector("span")
const currentLang = localStorage.getItem("lang") || "FA"

const changeBodyDir = () => {
    const lang = localStorage.getItem("lang") || "FA"
    menuLinks.forEach(link => {
        link.classList.toggle("dir-eng", lang === "EN")
    })

    linksIcon.forEach(elem => {
        elem.classList.toggle("dir-eng-icon", lang === "EN")
    })

    document.querySelector(".contact-wrapper").classList.toggle("dir-eng", lang === "EN")
    headerContainer.classList.toggle("dir-eng", lang === "EN")
}

const setText = () => {
    const lang = localStorage.getItem("lang") || "FA"
    const obj = lang === "FA" ? info["bodyFA"] : info["bodyEN"]

    textBodyElem.forEach(elem => {
        if (obj[elem.id]) {
            elem.innerHTML = obj[elem.id]
        }
    })
    changeBodyDir()
}

const translate = () => {
    const currentLang = localStorage.getItem("lang") || "FA"
    const newLang = currentLang === "FA" ? "EN" : "FA"
    localStorage.setItem("lang", newLang)
    text.textContent = currentLang;
    createItems(info[newLang])
    changDir()
    setText()
}

const changDir = () => {
    const newLang = localStorage.getItem("lang") || "FA"
    const links = document.querySelectorAll(".contact-box-wrapper a span:first-child")
    links.forEach(link => {
        link.dir = newLang === "FA" ? "rtl" : "ltr"
    })
}

const createTemplate = (data, lang) => {
    const wrapper = document.createElement('div');
    wrapper.className = "contact-wrapper glass-morphism-box";

    data.forEach(d => {
        const template = `<div class="contact-box-wrapper">
    <a href="${d.link}" target="_blank">
        <span dir="rtl">
            <i style="color: ${d.color}" class="${d.icon}"></i>
            ${lang[d.name]}
        </span>
        <span>${d.detail}</span>
    </a>
</div>`
        wrapper.insertAdjacentHTML("beforeend", template);
    })
    return wrapper;
}

const createItems = lang => {
    contactWrapper.innerHTML = "";
    const elements = createTemplate(info.data, lang);
    contactWrapper.appendChild(elements)
}

const setLang = lang => {
    createItems(lang === "FA" ? info.FA : info.EN)
    text.textContent = lang === "FA" ? "EN" : "FA"
    changDir()
    setText()
}

setLang(currentLang) // set language after load page
langBtn.addEventListener("click", translate) // button translate
