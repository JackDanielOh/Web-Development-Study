import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputGroup from "../common/InputGroup";

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(e) {
        this.setState({[e.tager.name]: e.target.value })
    }

    render() {
        const { errors, displaySocialInputs } = this.state;

        let socialInputs;

        if (displaySocialInputs){
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter fa-2x"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook-f fa-2x"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />

                    <InputGroup
                        placeholder="Linkedin Page URL"
                        name="linkedin"
                        icon="fab fa-linkedin fa-2x"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                    <InputGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube fa-2x"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />

                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram fa-2x"
                        value={this.state.instagram}
                        onChange={this.instagram}
                        error={errors.instagram}
                    />


                </div>
            )
        }

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className="d-block pd-3">*= required fields</small>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button
                            onClick={() => {
                                this.setState(prevState => ({
                                    displaySocialInputs: !prevState.displaySocialInputs
                                }));
                            }}
                            className="btn btn-light"
                        >
                            Add Social Network Links
                        </button>
                        <span className="text-muted">{"    "}    Optional</span>
                    </div>
                    {socialInputs}
                </div>

            </div>
        );
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(null)(CreateProfile);