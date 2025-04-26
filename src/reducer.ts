import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Incident = {
  id: number;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  reported_at: string;
};

type IncidentState = {
  incidents: Incident[];
};

const initialState: IncidentState = {
  incidents: []
};

const incidentPart = createSlice({
  name: 'incident',
  initialState,
  reducers: {
    set(state, action: PayloadAction<Incident[]>) {
      state.incidents = action.payload;
    },
    add(state, action: PayloadAction<Incident>) {
      state.incidents.push(action.payload);
    }
  }
});

export const { set, add } = incidentPart.actions;
export default incidentPart.reducer;
