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
    let searchedElementId = searchedElement[0]
   
    let searchElementList = listSearchedUsers.every(el => el.id !== searchedElementId.id)
    
    if (searchedUser.current.value !== '' && searchElementList) {
      setListSearchedUsers(listSearchedUsers.concat(searchedElement))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setListSearchedUsers(listSearchedUsers.concat(users))
  }
    
  // useEffect(() => {
  //   fetch(`${github_secrets.url}/${searchedUser.current.value}?client_id=${github_secrets.client_id}&client_secret=${github_secrets.client_secret}`)
  //     .then(response => response.json())
  //     .then(data => setUsers(data))
  // },[searchedUser])
  
  return (

      <div className="container-app">
          <div className="row-app">
              <Search  
                searchedUser={searchedUser}
                handleSubmit={handleSearch}
              />

              <List 
                listSearchedUsers={listSearchedUsers}
              />

          </div> 
      </div>
  )
}

export default App;

// /Dininni8319?client_id=${github_secrets.client_id}&client_secret=${github_secrets.client_secret}

{/* avatar_url: "https://avatars.githubusercontent.com/u/1?v=4"
events_url: "https://api.github.com/users/mojombo/events{/privacy}"
followers_url: "https://api.github.com/users/mojombo/followers"
following_url: "https://api.github.com/users/mojombo/following{/other_user}"
gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}"
gravatar_id: ""
html_url: "https://github.com/mojombo"
id: 1
login: "mojombo"
node_id: "MDQ6VXNlcjE="
organizations_url: "https://api.github.com/users/mojombo/orgs"
received_events_url: "https://api.github.com/users/mojombo/received_events"
repos_url: "https://api.github.com/users/mojombo/repos"
site_admin: false
starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}"
subscriptions_url: "https://api.github.com/users/mojombo/subscriptions"
type: "User"
url: "https://api.github.com/users/mojombo" */}