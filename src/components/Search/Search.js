import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './Search.module.css';

export default function Search(props) {
    
    return (
        <form className="form-app" onSubmit={props.handleSubmit}>
            <div className='input-search'>
                <FontAwesomeIcon icon={faSearch} className={`fa-1x font-awesome-icon`} />
                <input type="text" ref={props.searchedUser} onKeyUp={props.handleAutoComplete}/>
                {/* {
                    props.handleAutoComplete && props.handleAutoComplete.map(el => {
                        return (
                            <>
                              <img src={el.avatar_url} alt="" className={`img-avatar`}/>
                            </>
                        )
                    })

                } */}
                
            </div>

            <div>
               <button type='submit' className={`${classes['btn-submit-button']}`}>Search</button>
            </div>
      </form> 
    )
}