import './App.css';
import { useState, useEffect, useRef, useContext} from 'react';
import { ConfigContext } from './Context/Config/ConfigContext';
import elements from './data.json'
import Search from './components/Search/Search';
import List from './components/List/List';

function App() {
  const { github_secrets } = useContext(ConfigContext)
  const [users, setUsers] = useState([])
  const [listSearchedUsers, setListSearchedUsers] = useState([])
   
  const searchedUser = useRef('')

  const handleSearch = (e) => {
    e.preventDefault()
   
    let searchedElement = elements.filter(el => el.login.includes(searchedUser.current.value))
    let searchedElementId = searchedElement[0] ?  searchedElement[0].id : null
   
    let searchElementList = listSearchedUsers.every(el => el.id !== searchedElementId)
    
    if (searchedUser.current.value !== '' && searchElementList) {
       setListSearchedUsers(listSearchedUsers.concat(searchedElement))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setListSearchedUsers(listSearchedUsers.concat(users))
  }
    
  // useEffect(() => {
  //   fetch(`${github_secrets.url}${searchedUser.current.value}?client_id=${github_secrets.client_id}&client_secret=${github_secrets.client_secret}`)
  //     .then(response => response.json())
  //     .then(data => console.log(data,'testing the api' ))
  
  //     // .then(data => setListSearchedUsers([
  //     //   ...listSearchedUsers, data
  //     // ]))
    
  // },[searchedUser])
  
  useEffect(() => {

      fetch(`${'https://api.github.com/search/users?q='}${searchedUser.current.value}`)
        .then(response => response.json())
        .then(data => {
          
            setListSearchedUsers([
              data,
            ])
        })
      
    },[searchedUser.current.value])
      

  return (

      <div className="container-app">
          <div className="row-app">
              <Search  
                searchedUser={searchedUser}
                handleSearch={handleSearch}
                setListSearchedUsers={setListSearchedUsers}
                listSearchedUsers={listSearchedUsers}
              />

              <List 
                searchedUser={searchedUser}
                listSearchedUsers={listSearchedUsers}
              />

          </div> 
      </div>
  )
}

export default App;
