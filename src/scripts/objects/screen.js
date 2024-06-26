const screen = {
    inputSearch: document.querySelector(".input-search-field"),
    userProfile: document.querySelector(".profile-data"),
    renderUser(user) {
        this.userProfile.innerHTML = `  <div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possuí nome cadastrado 😢'}</h1>
                                                <p>${user.bio ?? 'Não possuí bio cadastrada 😢'}</p>
                                                <div class="following followers">
                                                    <p>👥 seguidores ${user.followers ?? '0'}</p>
                                                    <p>👥 seguindo ${user.following ?? '0'}</p>
                                                </div>
                                            </div>
                                        </div>`

        let repositoriesItens = "";
        user.repositories.forEach(repo => {

            repositoriesItens += `  <li>
                                        <a target="_blank" href="${repo.html_url}">
                                            ${repo.name}
                                            <div class="repositorie-details">
                                                <p>🍴 ${repo.forks ?? 'Não possuí forks'}</p>
                                                <p>⭐ ${repo.stargazers_count ?? 'Não possuí stars'}</p>
                                                <p>👀 ${repo.watchers_count ?? 'Não possuí watchers'}</p>
                                                <p>👨‍💻 ${repo.language ?? 'Outro'}</p>
                                            </div>
                                        </a>
                                    </li>`

        });

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            <div>`;
        }
    },

    renderUserEvents(user) {

        let eventsItens = "";
        user.events.forEach(userEvent => {
            let descriptionRepositorie = userEvent.payload.description;
            if(userEvent.payload.commits && userEvent.payload.commits.length > 0) {
                eventsItens += `<li class="repositorie-name">${userEvent.repo.name}<p class="commit-message">- ${userEvent.payload.commits[0].message ?? 'sem mensagem de commit'}</p></li>`
            }else{
                if(descriptionRepositorie === null){
                    descriptionRepositorie = 'Descrição não disponível';
                }
                eventsItens += `<li class="repositorie-name">${userEvent.repo.name}<p class="commit-message">- ${descriptionRepositorie}</p></li>`
            }
        });

        console.log(user.events);

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events-container section">
                                                <h3>Eventos</h3>
                                                <ul class="event">${eventsItens}</ul>
                                            </div>`
        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    },

    alertUserRequired() {
        let requiredEmptyInputMessage = `*Campo obrigatório`

        this.inputSearch.classList.add("wrong")
        this.inputSearch.innerHTML += `<span id="empty-input-messagem-required">${requiredEmptyInputMessage}</span>`
    },

    removeAuthenticationMessageFromEmptyInput() {
        if (this.inputSearch.classList.contains("wrong")) {
            this.inputSearch.classList.remove("wrong")
        }
    },
}

export { screen }