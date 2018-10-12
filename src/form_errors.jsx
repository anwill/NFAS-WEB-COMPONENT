// Not currently working
export class FormErrors extends React.Component {
    render() {
        let formErrors = this.props.formErrors;
        {
            Object.keys(formErrors).map((fieldName, i) => {
                if(formErrors[fieldName].length > 0) {
                    return (
                        <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                    );
                } else {
                    return '';
                }
            })
        }
        return '';
    }
}