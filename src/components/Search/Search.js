import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './Search.module.css';
import { useState, memo } from 'react';
import elements from './../../data.json';

export default function Search(props) {
    
    const [autoComplete, setAutoComplete] = useState(true)
    const [ suggestion, setSuggestions ] = useState([])
    
    const handleComplete = (id) => {
        setSuggestions([])
        setAutoComplete(false)
    }
    
    const handleHoverList = (id) => {
        let elementHovered = suggestion.filter( el => el.id === id)
        let searchElementList = props.listSearchedUsers.every(el => el.id !== elementHovered.id)
        
        if (searchElementList) {
            props.setListSearchedUsers(props.listSearchedUsers.concat(elementHovered))
            setSuggestions([])
        }
    }

    const handleAutoComplete = (id) => {
        
        let searchString = props.searchedUser.current.value
        
        let searchUser = elements.filter(el => el.login.match(searchString))
        let searchElementList = suggestion.some(el => el.id !== id)
        if (!searchElementList) {
            let newSet = [...new Set(suggestion)]
            setSuggestions(searchUser)  
        }
    }
   
    return (
        <form className="form-app" onSubmit={props.handleSubmit}>
            <div className='input-search'>
                <FontAwesomeIcon icon={faSearch} className={`fa-1x font-awesome-icon`} />
                <input type="text" ref={props.searchedUser} placeholder='Type in a github username' onKeyUp={handleAutoComplete} onClick={handleComplete}/>
                 {
                    suggestion && suggestion.map(el => {
                        return (
                            <form className={`${classes['auto-complete-users']}`} key={el.id} onClick={() => handleHoverList(el.id)} id='auto-copmete-list'>
                              <img src={el.avatar_url} alt="" className={`img-avatar`}/>
                              <p className={`${classes['user-title']}`}>{el.login}</p>
                            </form>
                        )
                    })
                }
                
            </div>

            <div>
               <button type='submit' className={`${classes['btn-submit-button']}`}>Search</button>
            </div>
      </form> 
    )
}