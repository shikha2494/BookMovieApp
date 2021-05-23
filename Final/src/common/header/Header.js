import React from 'react';
import logo from '../../assets/logo.svg';
import './Header.css';
import Button from '@material-ui/core/Button';
//Modal
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//Form for login and Register
import FormControl from "@material-ui/core/FormControl";
import Input from '@material-ui/core/Input';
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

function TabPanel(props) {
    const { index, value, children } = props;
    return (
        <div>
            <div hidden={value !== index}>
                {value === index && (
                    <div>{children}</div>
                )}
            </div>
        </div>
    );
}


export default function Header(props) {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [session, setSession] = React.useState(window.sessionStorage.getItem("access-token"));
    let button;
    const releasedMovie = "null";
    const [showModal, setShowModal] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [registerUserForm, setRegisterUserForm] = React.useState({
        email_address: "",
        first_name: "",
        last_name: "",
        mobile_number: "",
        password: ""

    });
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const inputChangedHandler = (event) => {
        const state = registerUserForm;
        state[event.target.name] = event.target.value;

        setRegisterUserForm({...state});

    }

    const inputUserNameHandler = (event) => {
        setUsername(event.target.value);
    }
    const inputPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onLoginFormSubmitted = async () => {
        const rawResponse = await fetch(props.baseUrl + '/auth/login',
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "authorization": "Basic " + window.btoa(username + ":" + password)
                                }
                            });
        window.sessionStorage.setItem("access-token",rawResponse.headers.get("access-token"));
        setSession(window.sessionStorage.getItem("access-token"));
        const data = await rawResponse.json();    
        setIsLoggedIn(true);
        closeModal();

    }

    const onFormSubmitted = async (event) => {
        const rawResponse = await fetch(props.baseUrl + '/signup',
                                    {
                                        method:"POST",
                                        headers:{
                                            'Content-Type':'application/json'
                                        },
                                        body:JSON.stringify(registerUserForm)
                                    }
                                    );
        const data = await rawResponse.json();
        console.log(data);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    Modal.setAppElement('#root');
    const openModal = () => {
        setShowModal(true);
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const logoutHandler = async () => {
        const rawResponse = await fetch(props.baseUrl + '/auth/logout',
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "authorization": "Basic " + window.btoa(username + ":" + password)
                                }
                            });
        window.sessionStorage.removeItem("access-token");
        setSession(window.sessionStorage.getItem("access-token"));
        const data = await rawResponse.json();   
        console.log(data); 
        setIsLoggedIn(false);
    }

    if (releasedMovie) {
        button = <Button variant="contained" color="primary" onClick={openModal}>Book Show</Button>;
    }
    return (
        <div className="header">
            <img src={logo} alt=""  className="logoRotate"/>
            <span style={{ float: "right" }}>
                {button}
                {session? <Button variant="contained" color="default" style={{ marginLeft: "10px" }} onClick={logoutHandler}>Logout</Button> : <Button variant="contained" color="default" style={{ marginLeft: "10px" }} onClick={openModal}>Login</Button>
                }
            </span>
            { showModal ? (<Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Tabs
                    value={value}
                    indicatorColor="secondary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div style={{margin:"20px", padding: "0 20px"}}>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="username">
                                Username
                            </InputLabel>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                onChange={inputUserNameHandler}
                            />
                            <FormHelperText className="dispNone">
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="password">
                                Password
                            </InputLabel>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                onChange={inputPasswordHandler}
                            />
                            <FormHelperText className="dispNone">
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/>
                        <br/>
                        <br/>
                        <div style={{textAlign: "center"}}>
                            <Button variant="contained" color="primary" onClick={onLoginFormSubmitted}>Login</Button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <div style={{margin:"20px", padding: "0 20px"}}>
                    
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="first_name">
                                First Name
                            </InputLabel>
                            <Input
                                id="first_name"
                                name="first_name"
                                type="text"
                                onChange={inputChangedHandler}
                            />
                        </FormControl><br/><br/>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="last_name">
                                Last Name
                            </InputLabel>
                            <Input
                                refs="last_name"
                                id="last_name"
                                name="last_name"
                                type="text"
                                onChange={inputChangedHandler}
                            />
                            <FormHelperText className="dispNone">
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/>
                        <br/>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="email">
                                Email
                            </InputLabel>
                            <Input
                                refs="email"
                                id="email"
                                name="email_address"
                                type="text"
                                onChange={inputChangedHandler}
                            />
                            <FormHelperText className="dispNone">
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/>
                        <br/>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="password">
                                Password
                            </InputLabel>
                            <Input
                                refs="password"
                                id="password"
                                name="password"
                                type="text"
                                onChange={inputChangedHandler}
                            />
                            <FormHelperText className="dispNone">
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/>
                        <br/>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="contact">
                                Contact No.
                            </InputLabel>
                            <Input
                                refs="mobile_number"
                                id="mobile_number"
                                name="mobile_number"
                                type="number"
                                onChange={inputChangedHandler}
                            />
                            <FormHelperText className="dispNone">
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/>
                        <br/>
                        <br/>
                        <div style={{textAlign: "center"}}>
                            <Button variant="contained" color="primary" onClick={onFormSubmitted}>Register</Button>
                        </div>
                    </div>
                </TabPanel>

            </Modal>) : null}

        </div>
    );
}
