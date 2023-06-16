window.onload = () => {
    const iframeDoc = window.frames[0].document

    document.getElementById("upload_image").addEventListener("click", () => {
        const pfp = document.getElementById("pfp_input").files[0];
        const username = document.getElementById("name_input").value
        const pfp_el = new Image();

        const fileReader = new FileReader();
        fileReader.onload = () => {
            pfp_el.src = fileReader.result;
        }

        fileReader.readAsDataURL(pfp);

        const details = {
            iframeDoc: iframeDoc,
            pfp: pfp_el,
            name: username,
        }
        BuiltProfileCard(details);
    })

}

function BuiltProfileCard(details) {
    const name = details.name;
    const pfp = details.pfp;
    const doc = details.iframeDoc;
    const printButton = document.getElementById("print");

    const backgroundColor = document.getElementById("background_color").value;
    const borderColor = document.getElementById("border_color").value;
    const boxShadowColor = document.getElementById("box_shadow_color").value;
    const githubLink = document.getElementById("github_link").value;
    const textColor = document.getElementById("text_color").value;
    const bodyBackgroundColor = document.getElementById("body_background_color").value;

    const igLink = document.getElementById("ig_link").value;
    const twitterLink = document.getElementById("twitter_link").value;
    const linkedinLink = document.getElementById("lin_link").value;
    const discordLink = document.getElementById("discord_link").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

    const style = `
    *{
        margin: 0;
        padding: 0;
        font-size: 18pt;
    }
    body{
        background-color: ${bodyBackgroundColor};
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        font-family: "Roboto", sans-serif;
    }

    a{
        color: ${textColor};
    }

    #my_info_holder {
        width: 50vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${backgroundColor};
        border: 1px solid ${borderColor};
        box-shadow: 0 0 10px ${boxShadowColor};
        color: ${textColor };
        border-radius: .5rem;
    }

    #pfp_and_username, #details, #social_details_holder, #contact_details_holder, #other_details {
        margin: 0.2rem .4rem;
        padding: 0.2rem .4rem;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    #pfp_and_username div, #pfp_and_username h1{
        margin: 0.2rem;
    }

    #social_details_holder, #contact_details_holder, #other_details{
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    #social_details_list li{
        margin: 0.2rem;
        padding: 0.2rem;
    }

    #pfp_and_username {
        flex-direction: column;
        align-content: center;
        justify-content: center;
        align-items: center;
    }

    #social_details_list, #contact_details_list {
        margin: .2rem;
        padding: .2rem;
        display: flex;
        list-style-type: none;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-start;
    }

    #other_details {
        padding: .5rem;
    }

    #bio{
        margin: .2rem;
        padding: .2rem;
        width: 75%;
        border-radius: .5rem;
        border: 1px solid ${borderColor}fe;
    }

    #other_details p{
        margin: 0.5rem;
        font-size: 12pt;
        padding: 0.1rem;
    }

    #update_status_and_share {
        margin: .2rem;
        padding: .2rem;
        display: flex;
        width: 90%;
        bottom: 0;
        justify-content: space-between;
    }

    #update_status_and_share p{
        font-size: 10pt;
        opacity: .5;
    }

    #update_status_and_share a{
        font-size: 14pt;
    }

    #pfp_holder, #pfp {
        height: 128px;
        width: 128px;
        border-radius: 50%;
    }
    `
    doc.head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">"`
    doc.body.innerHTML = `
    <style>${style}</style>
    <div id="my_info_holder">
        <div id="pfp_and_username">
            <div id="pfp_holder">
                <img src="" alt="pfp" id="pfp">
            </div>
            <h1 id="name_holder"></h1>
        </div>
        <div id="details">
            <div id="social_details_holder">
                <h4>Social media</h4>
                <ul id="social_details_list">
                    ${githubLink !== (null || "") ? `<li><a href="https://github.com/${githubLink}"><i class="fab fa-github"></i></a></li>` : ""}
                    ${discordLink !== (null || "") ? `<li><a href="${discordLink}" title="${discordLink}"><i class="fab fa-discord"></i></a></li>` : ""}
                    ${igLink !== (null || "") ? `<li><a href="https://www.instagram.com/${igLink}"><i class="fab fa-instagram"></i></i></a></li>` : ""}
                    ${linkedinLink !== (null || "") ? `<li><a href="${linkedinLink}"><i class="fab fa-linkedin"></i></i></a></li>` : ""}
                    ${twitterLink !== (null || "") ? `<li><a href="https://twitter.com/${twitterLink}"><i class="fab fa-twitter"></i></a></li>` : ""}
                </ul>
            </div>
            <div id="contact_details_holder">
                <h4>Contacts:</h4>
                <ul id="contact_details_list">
                    ${email !== (null || "") ? `<li><a href="mailto:${email}"><i class="fas fa-envelope"></i></a></li>` : ""}
                </ul>
            </div>
            <div id="other_details">
                <h4>Other details:</h4>
                <div id="bio">
                    <p>${bio}</p>
                </div>
            </div>
        </div>
        <div id="update_status_and_share">
            <p>Updated on ${new Date().toLocaleDateString()}</p>
            <a href="#"><i class="fas fa-share"></i></a>
        </div>
    </div>
    `
    doc.getElementById("name_holder").innerText = name;
    pfp.onload = () => {
        doc.getElementById("pfp").src = pfp.src;
    }

    printButton.addEventListener("click", () => {
        window.frames[0].print();
    })

    document.getElementById("download").addEventListener("click", () => {
        const content = window.frames[0];
        const link = document.createElement("a");
        link.href = `data: text/html;charset=utf-8,${encodeURIComponent(content.document.body.innerHTML)}`;
        encode
        link.download = "profile_card.html";
        link.click();
    })
}