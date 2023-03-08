export class GithubUser {
  static search(username) { 
    const endpoint = `https://api.github.com/users/${username}`
    return fetch(endpoint)
    .then(data => data.json()) 
    .then(({login, name,    public_repos,followers}) =>({
        login,
        name,
        public_repos,
        followers
    }))
  }
}


export class Favorites{

    constructor(root){
        this.root = document.querySelector(root)
        this.load()
        
        GithubUser.search('lucasluiz19').then(user => console.log(user))
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []        

        
    }

   async add(username){
        const user = await GithubUser.search(username)

        console.log(user)
    }


    delete(user){
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
         
        this.entries = filteredEntries
        this.update()
    }

}

export class FavoritesView extends Favorites{
    constructor(root){
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onadd()
    }
    onadd(){
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () =>{
           const {value} = this.root.querySelector('.search input') 
        
         this.add(value)  
        }
    }
    update(){
       this.removeAllTr()

    
        this.entries.forEach(user => {

        const row = this.createRow()

        row.querySelector('.user img').src =`http://github.com/${user.login}.png`

        row.querySelector('.user img').alt = `ìmagem de ${user.name}`

        row.querySelector('.user p').textContent=`${user.name}`

        row.querySelector('.user span').textContent=`${user.login}`

        row.querySelector('.repositories').textContent=`${user.public_repos}`

        row.querySelector('.followers').textContent=`${user.followers}` 

        row.querySelector('.remove').onclick=() =>{
            const isOk = confirm('tem certeza que deseja deletar?')
            if (isOk) {
                this.delete(user)
            }
        }

            this.tbody.append(row)
        })
        
      
      
    }

    createRow(){
        const tr= document.createElement('tr')
        const content= `
          <td class="user">
            <img src="http://github.com/lucasluiz19.png" alt="imagem de Lucas Luiz ">
            <a href="http://github.com/lucasluiz19" target="_blank">
                <p>Lucas Luiz</p>
                <span>lucasluiz19</span>
            </a>
          </td>
           <td class="repositories">
            21
           </td>
           <td class="followers">
            1
           </td>
           <td>
                <button  class="remove">&times;</button>
           </td>
  
        `
        tr.innerHTML=content
        return tr
    }

    removeAllTr(){
        
        this.tbody.querySelectorAll('tr').forEach((tr)=>{
             tr.remove()
        })
        
    }

}