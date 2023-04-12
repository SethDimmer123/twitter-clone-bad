
import {atom} from "recoil"

// const [modalState,setModal] = useState(false) 
// i could also write it this way 
// the useState hook limits my capacity to use it [Globally]

export const modalState = atom({//atom represents a piece of state (put it as an object)
    key: "modalState", 
    default:false,
});// the atom will be available for me to use globally in ANY COMPONENT 
// into any place i want to use it

// Recoil state management library
