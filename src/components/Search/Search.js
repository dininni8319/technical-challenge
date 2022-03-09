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
        let unique = props.listSearchedUsers.some(el => el.id === id)

        if(!unique) {
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
        <form className={`${classes['form-app']}`} onSubmit={props.handleSearch}>
            <div className={`${classes['section-search-input']}`}>
                <FontAwesomeIcon icon={faSearch} className={`fa-1x ${classes['font-awesome-icon']}`} />
                <input type="text" ref={props.searchedUser} placeholder='Type in a github username' className={`${classes['btn-input']}`} onKeyUp={handleAutoComplete} onClick={handleComplete}/>
                 {
                    suggestion && suggestion.slice(0,8).map(el => {
                        return (
                            <form className={`${classes['section-auto-complete']}`} key={el.id} onClick={() => handleHoverList(el.id)} id='auto-copmete-list'>
                              <img src={el.avatar_url} alt="" className={`${classes['img-avatar']}`}/>
                              <p className={`${classes['user-title']}`}>{el.login}</p>
                            </form>
                        )
                    })
                }
                
            </div>

            <div className={`${classes['section-btn']}`}>
               <button type='submit' className={`${classes['btn-submit-button']}`}>Search</button>
            </div>
      </form> 
    )
}