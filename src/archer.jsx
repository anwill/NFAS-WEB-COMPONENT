import React from "react";
import {Col, FormControl, FormGroup} from "react-bootstrap";

export class Archer extends React.Component {

    constructor(props) {
        super(props);
    }
    // Need a validation state function for archer's details
    getValidationState(id) {
        var { ...otherProps } = this.props;
        let fieldValidationErrors = this.props.state.formErrors;
        switch(id.toString()) {
            case '1':
                // Must have all fields set
                if (this.props.state["_nfas_bf_name"+id].length <= 0) {
                    fieldValidationErrors['Archer '+id] = ' must be entered';
                    return "error"
                }
                if (
                    this.validName(this.props.state["_nfas_bf_name"+id])
                    &&
                    this.props.state["_nfas_bf_class"+id]
                    &&
                    this.props.state["_nfas_bf_gender"+id]
                    &&
                    this.props.state["_nfas_bf_age"+id]
                    &&
                    this.validClub(this.props.state["_nfas_bf_club"+id])
                ) {
                    delete fieldValidationErrors['Archer ' + id];
                    return "success"
                } else {
                    fieldValidationErrors['Archer '+id] = ' must complete all fields';
                    return "error"
                }
                break;
            case '2':
            case '3':
            case '4':
            case '5':
                // Must have all fields set only if name is complete
                if (this.props.state["_nfas_bf_name"+id].length > 0) {
                    if (
                        this.validName(this.props.state["_nfas_bf_name" + id])
                        &&
                        this.props.state["_nfas_bf_class" + id]
                        &&
                        this.props.state["_nfas_bf_gender" + id]
                        &&
                        this.props.state["_nfas_bf_age" + id]
                        &&
                        this.validClub(this.props.state["_nfas_bf_club" + id])

                    ) {
                        delete fieldValidationErrors['Archer ' + id];
                        return "success"
                    } else {
                        fieldValidationErrors['Archer ' + id] = ' must complete all fields';
                        return "error"
                    }
                } else {
                    delete fieldValidationErrors['Archer ' + id];
                    return null;
                }
                break;

            default:
                break;
        }

        // Not sure this will work..
        this.props.state.formErrors = fieldValidationErrors;
    }

    // Validation
    validClub(c) {
        return (
                c.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$/u)
            &&
                c.length > 3
        );
    }

    validName(n) {
        return (
                n.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$/u)
            &&
                n.length > 3
            &&
                n.match(/\s+/)
        );

    }

    render() {
        var { handleChange, ...otherProps } = this.props;

        return (

            <FormGroup
                validationState={this.getValidationState(this.props.archerID)}
            >
                <Col sm={1}>
                    {this.props.archerID}
                </Col>
                <Col sm={3}>

                    <FormControl
                        placeholder={"Archer's Name"}
                        type={"text"}
                        name={"_nfas_bf_name" + this.props.archerID}
                        id={"_nfas_bf_name" + this.props.archerID}
                        value={this.props.state["_nfas_bf_name"+this.props.archerID]}
                        onChange={(e) => handleChange(e)}
                    />
                </Col>
                <Col sm={2}>
                    <FormControl
                        componentClass="select"
                        name={"_nfas_bf_class" + this.props.archerID}
                        id={"_nfas_bf_class" + this.props.archerID}
                        value={this.props.state["_nfas_bf_class"+this.props.archerID]}
                        onChange={(e) => handleChange(e)}
                    >
                            <option value={''}>Select Class</option>
                            <option value={'AFB'}>AFB</option>
                            <option value={'BB'}>Bare Bow</option>
                            <option value={'BH'}>Bow Hunter</option>
                            <option value={'CL'}>Compound Limited</option>
                            <option value={'CU'}>Compound Unlimited</option>
                            <option value={'XB'}>Crossbow</option>
                            <option value={'FS'}>Free Style</option>
                            <option value={'HT'}>Hunting Tackle</option>
                            <option value={'LB'}>Longbow</option>
                            <option value={'PM'}>Primitive</option>
                            <option value={'TBH'}>Traditional Bow Hunter</option>
                    </FormControl>
                </Col>
                <Col sm={2}>
                    <FormControl
                        componentClass="select"
                        name={"_nfas_bf_gender" + this.props.archerID}
                        id={"_nfas_bf_gender" + this.props.archerID}
                        value={this.props.state["_nfas_bf_gender"+this.props.archerID]}
                        onChange={(e) => handleChange(e)}
                    >
                            <option value={''}>Select Gender</option>
                            <option value={'F'}>Female</option>
                            <option value={'M'}>Male</option>
                    </FormControl>
                </Col>
                <Col sm={2}>
                    <FormControl
                        componentClass="select"
                        name={"_nfas_bf_age" + this.props.archerID}
                        id={"_nfas_bf_age" + this.props.archerID}
                        value={this.props.state["_nfas_bf_age"+this.props.archerID]}
                        onChange={(e) => handleChange(e)}
                    >
                            <option value={''}>Select Age</option>
                            <option value={'S'}>Senior</option>
                            <option value={'J'}>Junior</option>
                            <option value={'U'}>Under 12</option>
                    </FormControl>
                </Col>
                <Col sm={2}>
                    <FormControl
                        placeholder={"Club"}
                        type={"text"}
                        name={"_nfas_bf_club" + this.props.archerID}
                        id={"_nfas_bf_club" + this.props.archerID}
                        value={this.props.state["_nfas_bf_club"+this.props.archerID]}
                        onChange={(e) => handleChange(e)}
                    />
                </Col>
            </FormGroup>
        );
    }

}