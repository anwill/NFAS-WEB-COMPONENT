'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, FormControl, FormGroup, Form, Checkbox, ControlLabel, Col } from 'react-bootstrap'
import { Archer } from './archer'
import { ShootDays } from "./shoot_days";
import { FormErrors } from "./form_errors";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


class BookingForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            shootLoaded: false,
            shootData: {},
            isLoading: false,
            multiple_shoot_days: false,
            licence: props.licence,
            shootID: props.shoot,
            times_round: '',
            num_targets: '',
            max_per_target: '',
            licenceValid: false,
            shootValid: false,
            loadError: false,
            loadErrorMsg: '',
            saveError: false,
            saveErrorMsg: '',
            saved: false,
            _nfas_bf_email: '',
            _nfas_bf_shoot_together: '',
            _nfas_bf_shoot_days: '',
            _nfas_bf_notes: '',
            _nfas_bf_permission: '',
            _nfas_bf_name1: '',
            _nfas_bf_class1: '',
            _nfas_bf_gender1: '',
            _nfas_bf_age1: '',
            _nfas_bf_club1: '',
            _nfas_bf_name2: '',
            _nfas_bf_class2: '',
            _nfas_bf_gender2: '',
            _nfas_bf_age2: '',
            _nfas_bf_club2: '',
            _nfas_bf_name3: '',
            _nfas_bf_class3: '',
            _nfas_bf_gender3: '',
            _nfas_bf_age3: '',
            _nfas_bf_club3: '',
            _nfas_bf_name4: '',
            _nfas_bf_class4: '',
            _nfas_bf_gender4: '',
            _nfas_bf_age4: '',
            _nfas_bf_club4: '',
            _nfas_bf_name5: '',
            _nfas_bf_class5: '',
            _nfas_bf_gender5: '',
            _nfas_bf_age5: '',
            _nfas_bf_club5: '',
            formErrors: [],
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCBChange = this.handleCBChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    handleChange (event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleCBChange (event) {
        const name = event.target.name;
        const value = event.target.checked;
        this.setState({
            [name]: value
        });
    }

    getValidationState(name, value) {
        let fieldValidationErrors = this.state.formErrors;

        switch(name) {
            case '_nfas_bf_email':
                if (this.emailValid(value)) {
                    delete fieldValidationErrors[name];
                    return "success";
                } else if (value.length > 0 && ! this.emailValid(value)) {
                    fieldValidationErrors[name] = this.emailValid(value) ? '' : ' is invalid';
                    return "error";
                } else if (value.length <= 0) {
                    fieldValidationErrors[name] = ' is required';
                    return "error";
                } else {
                    return null;
                }
                break;
            case '_nfas_bf_permission':
                if (value) {
                    delete fieldValidationErrors[name];
                    return "success";
                } else {
                    fieldValidationErrors[name] = ' is required';
                    return "error";
                }
            default:
                break;
        }

        /* Causes error.... */
        this.setState(
            {
                formErrors: fieldValidationErrors
            });
        return null;
    }

    validateForm() {
        let errors = this.state.formErrors;
        console.log(errors);
        return (Object.keys(errors).length == 0);

    }

    formSubmit() {
        //console.log(this.state);
        // Validate form and submit if ok.

        if (this.validateForm()) {
            this.data = JSON.stringify(
                {
                    'licence': this.state.licence, 
                    'shoot': this.state.shootID,
                    'email': this.state._nfas_bf_email,
                    'shoot_together': this.state._nfas_bf_shoot_together,
                    'shoot_days': this.state._nfas_bf_shoot_days,
                    'notes': this.state._nfas_bf_notes,
                    'permission': this.state._nfas_bf_permission,
                    'name1': this.state._nfas_bf_name1,
                    'class1': this.state._nfas_bf_class1,
                    'gender1': this.state._nfas_bf_gender1,
                    'age1': this.state._nfas_bf_age1,
                    'club1': this.state._nfas_bf_club1,
                    'name2': this.state._nfas_bf_name2,
                    'class2': this.state._nfas_bf_class2,
                    'gender2': this.state._nfas_bf_gender2,
                    'age2': this.state._nfas_bf_age2,
                    'club2': this.state._nfas_bf_club2,
                    'name3': this.state._nfas_bf_name3,
                    'class3': this.state._nfas_bf_class3,
                    'gender3': this.state._nfas_bf_gender3,
                    'age3': this.state._nfas_bf_age3,
                    'club3': this.state._nfas_bf_club3,
                    'name4': this.state._nfas_bf_name4,
                    'class4': this.state._nfas_bf_class4,
                    'gender4': this.state._nfas_bf_gender4,
                    'age4': this.state._nfas_bf_age4,
                    'club4': this.state._nfas_bf_club4,
                    'name5': this.state._nfas_bf_name5,
                    'class5': this.state._nfas_bf_class5,
                    'gender5': this.state._nfas_bf_gender5,
                    'age5': this.state._nfas_bf_age5,
                    'club5': this.state._nfas_bf_club5
                });
            fetch('https://booking-nfas-api.singlearrow.co.uk/nfas_booking/save_booking', {
                method: 'POST',
                body: this.data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then( (response) => {
                    if (response.status === 200) {
                        this.setState({saved: true});
                        return response.json();
                    } else {
                        //console.log(response.statusText);
                        this.setState({saveError: true});
                        return response.json();
                    }

                }
            )
            .then( (data) => {
                //console.log(data);
                if (this.state.saveError) {
                    this.setState({saveErrorMsg: data.error})
                } else {
                    this.setState({saveData: data});
                }
            })
            .catch( (error) => {
                    //console.log(error);
                }
            );
        } else {
            alert("Form incomplete");
        }

    }

    // Validation

    emailValid(e) {
        return e.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    }


    // Load the data from server API
    componentDidMount() {
        this.setState({ isLoading: true });
        this.data = JSON.stringify({'licence': this.state.licence, 'shoot': this.state.shootID});
        fetch('https://booking-nfas-api.singlearrow.co.uk/nfas_booking/get_shoot', {
            method: 'POST',
            body: this.data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( (response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    //console.log(response.statusText);
                    this.setState({isLoading: false, loadError: true});
                    return response.json();
                }

            }
        )
        .then( (data) => {
            //console.log(data);
            if (this.state.loadError) {
                this.setState({loadErrorMsg: data.error})
            } else {
                this.setState({shootData: data, isLoading: false});
            }
        })
        .catch( (error) => {
                //console.log(error);
            }
        );
    }

    render() {

        const { shootData, isLoading } = this.state;

        if (isLoading) {
            return <div className={"container"}>Loading ...</div>;
        }

        if (this.state.loadError) {
            return <div className={"container"}>{this.state.loadErrorMsg}</div>
        }

        if (this.state.saveError) {
            return <div className={"container"}>{this.state.saveErrorMsg}</div>
        }

        if (this.state.saved) {
            return <div className={"container"}>Your booking has been sent to the club. You should receive an email confirmation shortly - please check your spam folder</div>
        }

        return (
            <div className={"container"}>
                <Form horizontal action={"#"} method={"get"}>
                    <input type={"hidden"} name={"_nfas_bf_shoot_id"} value={shootData.id}/>
                    <FormGroup>
                        <Col sm={2}>Shoot Date(s):</Col>
                        <Col sm={4}>
                            { shootData.dateFrom } { shootData.dateTo ? '- ' + shootData.dateTo : null }
                        </Col>
                        <Col sm={2}>Shoot Location:</Col>
                        <Col sm={4}>
                            { shootData.location }
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2}>Shoot Format:</Col>
                        <Col sm={4}>
                            { shootData.times_round } x { shootData.num_targets } targets
                        </Col>
                        <Col sm={2}>Max Archers Per Target:</Col>
                        <Col sm={4}>
                            { shootData.max_per_target }
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={12}>
                            Please use the form below to book into the above shoot. You can book in up to { shootData.max_per_target } archers per form.
                            Fields in red are required.
                        </Col>
                    </FormGroup>


                    {Array.apply(null, Array(shootData.max_per_target)).map(function(item, i){
                        return (
                          <Archer archerID={i+1}
                                  key={i}
                                  state={this.state}
                                  handleChange={this.handleChange}
                          />
                        );
                    }, this)}



                    <FormGroup controlId={"_nfas_bf_shoot_together"}>
                        <Col sm={2} componentClass={ControlLabel}>
                            Shoot Together
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type={"checkbox"}
                                name={"_nfas_bf_shoot_together"}
                                id={"_nfas_bf_shoot_together"}
                                value={"1"}
                                onClick={this.handleCBChange}
                            />
                        </Col>

                    </FormGroup>
                    <ShootDays
                        isMultiple={shootData.multipleShootDays}
                        shootData={shootData}
                        state={this.state}
                        handleChange={this.handleChange}
                    />
                    <FormGroup controlId={"_nfas_bf_notes"}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Notes
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                componentClass="textarea"
                                name={"_nfas_bf_notes"}
                                rows={"2"} cols={"70"}
                                placeholder={"E.g. Any medical conditions, shoot with"}
                                value={this.state._nfas_bf_notes}
                                onChange={this.handleChange}
                            >

                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup
                        validationState={this.getValidationState("_nfas_bf_email", this.state._nfas_bf_email)}
                        controlId={"_nfas_bf_email"} >
                        <Col componentClass={ControlLabel} sm={2}>
                            Your Email
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type={"email"}
                                name={"_nfas_bf_email"}
                                id={"_nfas_bf_email"}
                                value={this.state._nfas_bf_email}
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup
                        validationState={this.getValidationState("_nfas_bf_permission", this.state._nfas_bf_permission)}
                        controlId={"_nfas_bf_permission"}
                    >
                        <Col componentClass={ControlLabel} sm={10}>
                            In order to use this book in form you will need to agree to SingleArrow and the club
                                     temporarily holding the above data
                        </Col>
                        <Col sm={2}>
                            <Checkbox
                                name={"_nfas_bf_permission"}
                                id={"_nfas_bf_permission"}
                                value={"1"}
                                onClick={this.handleCBChange}
                            />
                        </Col>

                    </FormGroup>
                    <FormGroup>
                        <Col sm={12}>
                            <FormErrors formErrors={this.state.formErrors} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                          <Button onClick={this.formSubmit}>Book in</Button>
                        </Col>
                    </FormGroup>

                </Form>
            </div>

        );
    }
}

let domContainer = document.querySelector('#nfas-booking-app');
ReactDOM.render(<BookingForm {...(domContainer.dataset)} />, domContainer);

module.hot.accept();