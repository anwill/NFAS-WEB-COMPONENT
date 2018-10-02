import React from "react";
import {Col, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

export class ShootDays extends React.Component {
    constructor(props) {
        super(props);
    }
    // Need a validation state function for archer's details
    getValidationState(name) {
        var { ...otherProps } = this.props;
        let fieldValidationErrors = this.props.state.formErrors;

        switch(name) {
            case '_nfas_bf_shoot_days':
                if (this.props.state._nfas_bf_shoot_days) {
                    delete fieldValidationErrors[name];
                    return "success";
                } else {
                    fieldValidationErrors[name] = ' must be selected';
                    return "error";
                }
                break;

            default:
                break;
        }

        // Not sure this will work..
        this.props.state.formErrors = fieldValidationErrors;
    }

    render() {
        var { handleChange, ...otherProps } = this.props;
        if (this.props.shootData.dateTo) {
            return (
                <FormGroup controlId={"_nfas_bf_shoot_days"}
                           validationState={this.getValidationState("_nfas_bf_shoot_days")}
                >
                    <Col componentClass={ControlLabel} sm={2}>
                        Shoot Days
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            componentClass="select"
                            name={"_nfas_bf_shoot_days"}
                            id={"_nfas_bf_shoot_days"}
                            value={this.props.state._nfas_bf_shoot_days}
                            onChange={(e) => handleChange(e)}
                        >
                                <option value={''}>Please Select</option>
                                <option value={'Both'}>Both Days</option>
                                <option value={this.props.shootData.dateFrom}>{this.props.shootData.dateFrom}</option>
                                <option value={this.props.shootData.dateTo}>{this.props.shootData.dateTo}</option>
                        </FormControl>

                    </Col>
                </FormGroup>
            );
        } else {
            return null;
        }
    }
}