import { configureStore, createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo", //ici je donne le nom de l'état.
    //ici je met ce a quoi correspond mon tableau.
    initialState: [ 
        { id: 1, text: "Faire les courses", done: false },
        { id: 2, text: "Ménage !", done: true },
    ],
    //ici j'appel le reducer qui va accepter l'action que l'ont souhaite lui rajouter.
    //il changera donc l'état de ma tache.
    reducers: {
        addTask: (state, action) => {
            // { type: " ADD_TASK", payload: "Aller faire les courses"}
            const newTask = {
                id: Date.now(),
                done: false,
                text: action.payload
            };
            //ici je push ma nouvelle action dans mon tableau de tache.
            state.push(newTask);
        },

        //ici j'ajoute l'action.
        toggleTask: (state, action) => {
            // je met l'id de ma tache
            // { type: " ADD_TASK", payload: "20"}
            const task = state.find(t => t.id === action.payload);
            task.done = !task.done;
        },
        //ici je supprime l'action.
        deleteTask: (state, action) => {
            // ici je reprend tous les identifiant différent de 20.
            // { type: " ADD_TASK", payload: "20"}
            state = state.filter(t => t.id !==  action.payload);
            return state;
        }
    }
});

export const { addTask, deleteTask, toggleTask } = todoSlice.actions;

//ici je configure mon magasin et donc le store!
// crée donc la const store que j appel avec la fonction configureStore.
//J'ajoute a mon magasin la const déjà crée qui s'appel todoSlice elle est en accord avec le reducer.
export const store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
    },
});


//j'export createToogle pour l'utiliser directement dans un autre fichier.
export const createToggle = (id) => {
    return {
        type: "todo/toggleTask",
        payload: id,
    }
};