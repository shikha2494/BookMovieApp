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

    let button;
    const releasedMovie = "null";
    const [showModal, setShowModal] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);

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

    if (releasedMovie) {
        button = <Button variant="contained" color="primary" onClick={openModal}>Book Show</Button>;
    }
    return (
        <div className="header">
            <img src={logo} alt="" />
            <span style={{ float: "right" }}>
                {button}
                <Button variant="contained" color="default" style={{ marginLeft: "10px" }}>Login</Button><Button variant="contained" color="default" style={{ marginLeft: "10px" }}>Logout</Button>
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
                    textColor="default"
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
                            />
                            <FormHelperText className="dispNone">
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/>
                        <br/>
                        <br/>
                        <div style={{textAlign: "center"}}><Button variant="contained" color="primary">Login</Button></div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <div style={{margin:"20px", padding: "0 20px"}}>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="firstname">
                                First Name
                            </InputLabel>
                            <Input
                                id="firstname"
                            />
                            <FormHelperText className="dispNone">
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="lastname">
                                Last Name
                            </InputLabel>
                            <Input
                                id="lastname"
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
                                id="email"
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
                                id="password"
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
                                id="contact"
                            />
                            <FormHelperText className="dispNone">
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br/>
                        <br/>
                        <br/>
                        <div style={{textAlign: "center"}}><Button variant="contained" color="primary">Register</Button></div>
                    </div>
                </TabPanel>

            </Modal>) : null}

        </div>
    );
}
