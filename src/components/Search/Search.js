import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './Search.module.css';
import { useState, memo } from 'react';
import elements from './../../data.json';

export default function Search(props) {
    
    const [autoComplete, setAutoComplete] = useState(false)
    
    const [ suggestion, setSuggestions ] = useState([])
    
    const handleAutoComplete = () => {
        
        let searchString = props.searchedUser.current.value
        
        let searchUser = elements.filter(el => el.login.match(searchString))
        
        console.log(searchUser, 'test');
   
        let searchElementList = suggestion.some(el => el.id !== elements.id)
        
        if (searchString === '' && !searchElementList) {
            console.log(newSet, 'in the new set');
            let newSet = [...new Set(suggestion)]
            setSuggestions(newSet.concat(searchUser)) 
        }

    }
   
    return (
        <form className="form-app" onSubmit={props.handleSubmit}>
            <div className='input-search'>
                <FontAwesomeIcon icon={faSearch} className={`fa-1x font-awesome-icon`} />
                <input type="text" ref={props.searchedUser} placeholder='Type in a github username' onKeyUp={handleAutoComplete}/>
                 {
                    suggestion && suggestion.map(el => {
                        return (
                            <div className={`${classes['auto-complete-users']}`} key={el.id}>
                              <img src={el.avatar_url} alt="" className={`img-avatar`}/>
                              <p className={`${classes['user-title']}`}>{el.login}</p>
                            </div>
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