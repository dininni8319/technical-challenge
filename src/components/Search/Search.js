import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './Search.module.css';
import { useState, memo } from 'react';
import elements from './../../data.json';

export default function Search(props) {
    
    const [autoComplete, setAutoComplete] = useState(true)
    const [ suggestion, setSuggestions ] = useState([])
    
    const  handleComplete = () => {
        setSuggestions([])
        setAutoComplete(false)
        // props.setListSearchedUsers('')
    }
    
    const handleAutoComplete = () => {
        
        let searchString = props.searchedUser.current.value
        
        let searchUser = elements.filter(el => el.login.match(searchString))
        
        console.log(searchUser, 'test');
        
        let searchElementList = suggestion.some(el => el.id !== elements.id)
        console.log(searchElementList);
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
                            <form className={`${classes['auto-complete-users']}`} key={el.id} onClick={props.handleSubmit} >
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