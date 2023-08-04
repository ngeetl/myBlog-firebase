import { addToast as add, removeToast as remove } from '../store/toastSlice';
import { useDispatch } from 'react-redux';


const useToast = () => {
    const dispatch = useDispatch();

    const removeToast = (id) => {
        dispatch(remove(id));
    }

    const addToast = (toast) => {
        let id = Math.random();
        const toastWithId = {...toast, id: id};

        dispatch(add(toastWithId));
        
        setTimeout(() => removeToast(id), 4000);
    }
  

  return { addToast, removeToast }
}

export default useToast
