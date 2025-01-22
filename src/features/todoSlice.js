import { createAsyncThunk,createSlice, nanoid } from '@reduxjs/toolkit'
import { supabase } from '../backend/supabaseConfig'
import { useSelector } from 'react-redux'

//This is a initial STate
// const user_id=useSelector((state)=>{return state.auth.loginDetails.id})
const initialState = {
    todos: [{
        id: 1,
        text: "hello World"
    }],
    initialTask: JSON.parse(localStorage.getItem("currentNote"))?JSON.parse(localStorage.getItem("currentNote")):{},
    supaTasks:[],
    viewMode: { class: "flex flex-col", name: "column mode" },
    isAlert: false,
    AlertMessage: "",
    AlertStyle: "red-600"
}

export const fetchNotes=createAsyncThunk('fetchNotes',async(details,{rejectWithValue})=>{
    try {
        const {data,error}= await supabase
    .from('notes')
    .select()
    .eq('user',details.user_id)
    console.log(data)
    if(error){
        throw new Error(error.message)
    }
    return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
    
})

export const addNote=createAsyncThunk('addNote',async(details,{rejectWithValue})=>{
    try {
        const {data,error}=await supabase
        .from('notes')
        .upsert({  text: details.text,user:details.user_id,style:{"color":"bg-black text-white"} })
        .select()
        if(error){
            throw new Error(error.message)
        }
        return data
    } catch (error) {
        return rejectWithValue(error); // Send the error to the `rejected` case
    }
})

export const updateNote=createAsyncThunk("updateNote",async(details,{rejectWithValue})=>{
    try {
        const data=await supabase
    .from('notes')
    .update(details.data)
    .eq('id', details.note_id)
    if(data.error){
        throw new Error(data.error.message)
    }
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteNote=createAsyncThunk("deleteNote",async(details,{rejectWithValue})=>{
    try {
        const data=await supabase
    .from('notes')
    .delete()
    .eq('id', details.note_id)
    if(data.error){
        throw new Error(data.error.message)
    }
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        //You will always be provided by two params state and action
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((e) => {
                return e.id !== action.payload
            })
        },
        setIndividualTask: (state, action) => {
            state.initialTask = action.payload
            localStorage.setItem("currentNote",JSON.stringify(action.payload))
        },
        changeViewMode: (state, action) => {
            state.viewMode = { ...action.payload }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchNotes.rejected,(state,action)=>{
            console.log("REJECTED")
            alert("rejected")
        })
        builder.addCase(fetchNotes.fulfilled,(state,action)=>{
            state.supaTasks=action.payload || []
        })
        builder.addCase(addNote.rejected,(state,action)=>{
            alert("REJCTED"+ " "+action.payload)
        })
        builder.addCase(addNote.fulfilled,(state,action)=>{
            state.initialTask=action.payload[0]
            state.isAlert = true
            state.AlertMessage = "new note has been created"
            state.AlertStyle = "green-600"
        })
        builder.addCase(updateNote.rejected,(state,action)=>{
            alert("REJECTED"+ " "+action.payload)
        })
        builder.addCase(updateNote.fulfilled,(state,action)=>{
            state.isAlert = true
            state.AlertMessage = "note has been updated"
            state.AlertStyle = "green-600"
        })
        builder.addCase(deleteNote.rejected,(state,action)=>{
            alert("REJECTED"+ " "+action.payload)
        })
        builder.addCase(deleteNote.fulfilled,(state,action)=>{
            state.isAlert = true
            state.AlertMessage = "note has been updated"
            state.AlertStyle = "green-600"
        })
    }
})

export const { addTodo, removeTodo, UpdateTodo, setIndividualTask, changeViewMode } = todoSlice.actions

export default todoSlice.reducer