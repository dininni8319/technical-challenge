import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './Search.module.css';
import { useState, memo } from 'react';
import elements from './../../data.json';

export default function Search(props) {
    
    const [autoComplete, setAutoComplete] = useState(false)
    
    const [ suggestion, setSuggestions ] = useState([])

    const handleAutoComplete = () => {
        
        let firstThreeLetters = props.searchedUser.current.value.slice(0, 3)
        let searchedElement = elements.filter(el => el.login.includes(firstThreeLetters))
        
        console.log(suggestion, searchedElement, suggestion, 'teststst');
        if (searchedElement) {
            setSuggestions(suggestion.concat(searchedElement)) 
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
                            <div className={`${classes['auto-complete-users']}`}>
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