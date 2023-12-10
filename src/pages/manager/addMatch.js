import React from "react";
import { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form, FieldArray } from "formik";
import classes from "./form.module.css";
import * as Yup from "yup";
import axios from "axios";


const AddMatch = (props) => {

    // Stadium Getting and Setting
    const [stadiumData,setStadiumData ] = useState([]);
    async function getStadiumData() {    
        // var config = {
        // method: 'get',
        // headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
        // };
        // let response = '';
        // try {
    
        //   response = await axios.get("http://localhost:3001/stadiums/all-stadiums",config).then((res) => res.data);
        //   return (response);
        // } catch (error) {
        //   if (error.response) {
        //     return (error.response);
        //   }
        // }
        // return (response);
    }
    useEffect(() => {
        (async () => {
        const resp = await getStadiumData();
        setStadiumData(resp);
        })();
    }, []);

    const initialValues = {
    venue:"",
    firstTeam:"",
    secondTeam:"",
    date:"",
    time:"",
    referee:"",
    firstLinesmen:"",
    secondLinesmen:"",
    seating: [],
    noRows:"",
    venuename:"",
    reserved:0
    };

    const validationSchema = Yup.object().shape({});

    const onformSubmit = (data) => {

    async function addMatch() {
        // console.log(data.venue);
        // const x = new Date('2023-01-01');
        // const y = new Date(data.date);
        // if(data.firstTeam==data.secondTeam)
        // {
        //     alert("Same team");
        //     return;
        // }
        // else if(y<=x)
        // {
        //     alert("Past Date");
        //     return;
        // }
        // try {
        //     data.seating = Array.from({length: Number(stadiumData[Number(data.venue)].numSeats)}, (v, i) => 0);
        //     data.noRows = stadiumData[Number(data.venue)].numRows;
        //     data.venuename = stadiumData[Number(data.venue)].venue;
        //     data.reserved = 0;
        //     const request = await axios.post("http://localhost:3001/matches/add-match", data, 
        //     { headers: { Authorization: `Bearer ${sessionStorage.getItem("tokenValue")}` } }).then((res) => {
        //         console.log(res)
        //     })
        //     window.location.reload(false);

        // } catch (err) {
            
        // }

    }
    addMatch()
    };

    const Teams = ['Al Ahly FC','Pyramids FC','Zamalek SC','Cleopatra FC','Modern Future FC','El Masry SC','Bank El Ahly','	Pharco FC','El Mokawloon SC',"Tala'ea El Gaish",'Ittihad Alexandria SC','Smouha SC','Enppi SC','Zed FC','	Ismaily SC','El Gouna FC',
    'Baladiyat El Mahalla','El Dakhlia SC']

    function dropDownMenu(option,index) {
    return (
        <option  key = {index}className={classes.option} value={index}>{option}</option>
    )
}
    return (

    <div className={classes.body}>
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onformSubmit(values)}
    >
        {({ values }) => (
        <Form className={classes.shape}>
            <h2 className={classes.titles}>Add Match</h2>
            <div className={classes.forminput}>
            <div className={classes.inputbox}>
                <label className={classes.label}>First Team</label>
                <Field as="select" className={classes.input} type="text" name="firstTeam" placeholder="Type here">
                    <option value="" disabled="disabled">Select team</option>
                    {Teams.map((g, index)=> dropDownMenu(g,index))}
                </Field>
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>Second Team</label>
                <Field as="select" className={classes.input} type="text" name="secondTeam" placeholder="Type here">
                    <option value="" disabled="disabled">Select team</option>
                    {Teams.map((g, index)=> dropDownMenu(g,index))}
                </Field>
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>Date</label>
                <Field
                className={classes.input}
                type="date"
                name="date"
                placeholder="Type here"
                />
                <ErrorMessage
                className={classes.Err}
                name="date"
                component="span"
                />
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>Time</label>
                <Field
                className={classes.input}
                type="time"
                name="time"
                placeholder="Type here"
                />
                <ErrorMessage
                className={classes.Err}
                name="time"
                component="span"
                />
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>Stadium</label>
                <Field as="select" className={classes.input} type="text" name="venue" placeholder="Type here">
                <option value="" disabled="disabled">Select Stadium</option>
                {stadiumData? stadiumData.map((g, index)=> dropDownMenu(g.venue,index)) : null}
                </Field>
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>Referee</label>
                <Field
                className={classes.input}
                type="text"
                name="referee"
                placeholder="Type here"
                />
                <ErrorMessage
                className={classes.Err}
                name="referee"
                component="span"
                />
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>First Line man</label>
                <Field
                className={classes.input}
                type="text"
                name="firstLinesmen"
                placeholder="Type here"
                />
                <ErrorMessage
                className={classes.Err}
                name="firstLinesmen"
                component="span"
                />
            </div>
            <div className={classes.inputbox}>
                <label className={classes.label}>Second Line man</label>
                <Field
                className={classes.input}
                type="text"
                name="secondLinesmen"
                placeholder="Type here"
                />
                <ErrorMessage
                className={classes.Err}
                name="secondLinesmen"
                component="span"
                />
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