import React from "react";
import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import classes from "./form.module.css";
import * as Yup from "yup";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import toast, { ToastBar } from "react-hot-toast";
import MyToaster from "../../generic components/toaster/MyToaster";


const AddMatch = (props) => {

    const initialValues = {
        firstTeam:"",
        secondTeam:"",
        dateTime:"",
        referee:"",
        firstLinesman:"",
        secondLinesman:"",
        stadium: "",
        };

    function dropDownMenu(option,id) {
    return (
        <option  key = {id}className={classes.option} value={id}>{option}</option>
    )
    }

    // useEffect to get team on the time
    const [dataTime,setdataTime] = useState([]);
    const [time,setTime] = useState([]);
    const [date,setDate] = useState([]);
    const [staff,setStaff] = useState([]);
    const [referees,setReferees] = useState([]);

    


    // Stadium Getting and Setting
    const [teamData,setTeamData ] = useState([]);
    const [stadiumData,setStadiumData ] = useState([]);
    const [refereeData,setrefereeData ] = useState([]);
    const [firstLinesmenData,setfirstLinesmenData ] = useState([]);
    const [secondLinesmenData,setsecondLinesmenData ] = useState([]);
    const [dateTimeData,setdateTimeData ] = useState("");

    async function getTeamsData(concatenatedDateTime) {    
        const resp = await axios.get(routes.getTeam+concatenatedDateTime);
        return resp.data;
    }

    async function getStadiumData(concatenatedDateTime) {
        const resp = await axios.get(routes.getStadium+concatenatedDateTime);
        return resp.data;
    }

    async function getStaffData(concatenatedDateTime) {
        const resp = await axios.get(routes.getStaff+concatenatedDateTime);
        return resp.data;
    }

    
    useEffect(() => {
        const concatenatedDateTime = `${date}T${time}:00.000Z`;
        setdateTimeData(concatenatedDateTime);
        (async () => {
        const teamRes = await getTeamsData(concatenatedDateTime);
        setTeamData(teamRes);
        const stadiumRes = await getStadiumData(concatenatedDateTime);
        setStadiumData(stadiumRes);
        const staffRes = await getStaffData(concatenatedDateTime);
        setStaff(staffRes);

        console.log(staffRes);
        })();
    }, [time,date]);
    

    const validationSchema = Yup.object().shape({
    stadium: Yup.string()
        .required("Please enter a stadium"),
        
    });

    const onformSubmit = (data) => {
    data.dateTime = dateTimeData;
    console.log(data);
    async function addMatch() {
        try {
        const res = await axios.post(routes.addMatch, data);
        console.log(res);
        toast.success("Match Added Successfully!");
        } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
        }

    }
    addMatch()
    };


    return (

    <div className={classes.body}>
    <MyToaster />
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onformSubmit}
    >
        {({ values }) => (
            <Form className={classes.shape}>
            {setTime(values.time)}
            {setDate(values.date)}
            <h2 className={classes.titles}>Add Match</h2>
            <div className={classes.forminput}>
            <div className={classes.inputbox}>
                <label className={classes.label}>Date</label>
                <Field
                className={classes.input}
                type="date"
                name="date"
                placeholder="Type here"
                required
                />
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>Time</label>
                <Field
                className={classes.input}
                type="time"
                name="time"
                placeholder="Type here"
                required
                />
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>First Team</label>
                <Field as="select" className={classes.input} type="text" name="firstTeam" placeholder="Type here" required>
                    <option value="" disabled="disabled">Select team</option>
                    {teamData.map((g, index) => dropDownMenu(g.name,g._id))}
                </Field>
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>Second Team</label>
                <Field as="select" className={classes.input} type="text" name="secondTeam" placeholder="Type here" required>
                    <option value="" disabled="disabled">Select team</option>
                    {teamData.map((g, index)=> dropDownMenu(g.name,g._id))}
                </Field>
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>Stadium</label>
                <Field as="select" className={classes.input} type="text" name="stadium" placeholder="Type here" >
                <option value="" disabled="disabled">Select Stadium</option>
                {stadiumData? stadiumData.map((g, index)=> dropDownMenu(g.name,g._id)) : null}
                </Field>
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>Referee</label>
                <Field as="select" className={classes.input} type="text" name="referee" placeholder="Type here" >
                <option value="" disabled="disabled">Select Referee</option>
                {staff ? staff.filter(item => item.type === 'referee').map((g, index) => dropDownMenu(g.name, g._id)) : null}
                </Field>
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>First Line Man</label>
                <Field as="select" className={classes.input} type="text" name="firstLinesman" placeholder="Type here" >
                <option value="" disabled="disabled">Select First Line Man</option>
                {staff ? staff.filter(item => item.type === 'linesman').map((g, index) => dropDownMenu(g.name, g._id)) : null}
                </Field>
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>Second Line Man</label>
                <Field as="select" className={classes.input} type="text" name="secondLinesman" placeholder="Type here" >
                <option value="" disabled="disabled">Select Second Line Man</option>
                {staff ? staff.filter(item => item.type === 'linesman').map((g, index) => dropDownMenu(g.name, g._id)) : null}
                </Field>
            </div>
            </div>
            <button type="submit" className={classes.buttons}>Submit</button>
        </Form>
        )}
    </Formik>
    </div>
);
};

export default AddMatch;