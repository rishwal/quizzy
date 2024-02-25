import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    status: "idle",
    error: null,
}

export const fetchQuestions = createAsyncThunk("data/fetchQuestions", async (category) => {
    try {
        const res = await axios.get("https://quizapi.io/api/v1/questions?apiKey=6rBSjmBkyK4K6nbagrvMRVUlIvy4IpJvH9Ya8AZS&category=code&difficulty=Easy&limit=10&tags=JavaScript");
        return res.data;
    }
    catch (err) {
        throw err;
    }
})

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        chnageAttendedStatus: (state, action) => {
            const currentObj = state.data.find(el => el.id === action.payload)
            currentObj.attended = true;
            return state;
        }

    },

    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload.map(obj => ({
                ...obj,
                attended: false,
            }));
        })
            .addCase(fetchQuestions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})


export const { chnageAttendedStatus } = quizSlice.actions;
export default quizSlice.reducer;
