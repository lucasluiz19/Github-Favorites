export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }
    load() {
        this.entries = [
         {
            login:'lucasluiz19',
            name:'lucas luiz ',
            public_repos: '22',
            followers: '321'
          },
          {
            login:'diego3g',
            name:'diego fernandes',
            public_repos:'1234',
            followers:'70'
          }
        ]
        
    }
}

export class FavoritesView extends Favorites{
    constructor(root){
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
       
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