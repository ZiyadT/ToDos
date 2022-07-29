import pencil from './pencil.png'
import bin from './bin.png'
import check from './check.png'
import delete_btn from './delete-button.png'
export default function Todo(props){
    return(
        <div key={props.object._id} className={props.done ? "bg-indigo-500 border-b border-black h-14 flex px-12 justify-between" : "border-b border-black h-14 flex px-12 justify-between transition ease-in duration-150 hover:bg-indigo-500"}>
            <div className={props.updating ? "hidden" : "flex"}>
                <input type="checkbox" className="mx-6" onClick={() => props.complete(props.object._id)}></input>
                <s className={props.done ? "my-auto" : "hidden"}>{props.object.task}</s>
                <p className={props.done ? "hidden" : "my-auto"}>{props.object.task}</p>
            </div>
            <div className={props.updating ? "hidden" : "flex"}>
                <img src={pencil} alt="edit" className={props.done ? "h-1/3 my-auto opacity-60 px-2 hover:opacity-100 hidden" : "h-1/3 my-auto opacity-60 px-2 hover:opacity-100"} onClick={() => props.edit(props.object._id)}/>
                <img src={bin} alt="delete" className="h-1/3 my-auto opacity-60 px-2 hover:opacity-100" onClick={() => props.del(props.object._id)}/>
            </div>
            <label className={props.updating ? "m-auto" : "hidden"}>Edit</label>
            <input name="update" type="text" className={props.updating ? "bg-indigo-100 border rounded border-black my-auto mx-6 px-4 w-4/5 focus:outline-none" : "hidden"} onChange={props.handleChange}></input>
            <div className={props.updating ? "flex" : "hidden"}>
                <img src={check} alt="confirm" className={props.done ? "h-2/5 my-auto opacity-60 px-2 hover:opacity-100 hidden" : "h-2/5 my-auto opacity-60 px-2 hover:opacity-100"} onClick={props.update}/>
                <img src={delete_btn} alt="cancel" className="h-2/5 my-auto opacity-60 px-2 hover:opacity-100" onClick={() => props.cancel(props.object._id)}/>
            </div>
        </div>
    )
}