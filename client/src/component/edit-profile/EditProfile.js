import React, {Component} from 'react';
import { connect } from "react-redux";
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

import InputGroup from "../common/InputGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class EditProfile extends Component {
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
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            const skillsCSV = profile.skills;

            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername)
                ? profile.githubusername: '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social =  !isEmpty(profile.social) ? profile.social: {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter: '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook: '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin: '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube:'';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram: '';

            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube
            });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.twitter,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };
        this.props.createProfile(profileData, this.props.history);
    }

    render() {
        const {errors, displaySocialInputs} = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        onChange={this.onChange}
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="Facebook Page URL"
                        onChange={this.onChange}
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        onChange={this.onChange}
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="YouTube Channel URL"
                        onChange={this.onChange}
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        error={errors.youtube}

                    />
                    <InputGroup
                        placeholder="Instagram Page URL"
                        onChange={this.onChange}
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.youtube}
                        error={errors.instagram}
                    />
                </div>
            );
        }

        // Select option for status
        const options = [
            {label: '* Select Professional Status', value: 0},
            {label: 'Developer', value: 'Developer'},
            {label: 'Junior Developer', value: 'Junior Developer'},
            {label: 'Senior Developer', value: 'Senior Developer'},
            {label: 'Manager', value: 'Manager'},
            {label: 'Student or Learning', value: 'Student or Learning'},
            {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
            {label: 'Intern', value: 'Intern'},
            {label: 'Other', value: 'Other'}
        ];

        return (
            <div className="edit-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">
                                Edit Profile
                            </h1>
                            <small className="d-block pb-3">
                                * = required fields
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    onChange={this.onChange}
                                    value={this.state.handle}
                                    error={errors.handle}
                                    name="handle"
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    onChange={this.onChange}
                                    value={this.state.status}
                                    error={errors.status}
                                    name="status"
                                    options={options}
                                    info="Give us an idea of where you are at in your career"
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    onChange={this.onChange}
                                    value={this.state.company}
                                    name="company"
                                    error={errors.company}
                                    info="Could be your own company or one you work for"
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    onChange={this.onChange}
                                    value={this.state.website}
                                    name="website"
                                    error={errors.website}
                                    info="Could be your own website or your company's"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    onChange={this.onChange}
                                    value={this.state.location}
                                    name="location"
                                    error={errors.location}
                                    info="City or city & state suggested (eg. Melbourne, Aus"
                                />
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    onChange={this.onChange}
                                    value={this.state.skills}
                                    name="skills"
                                    error={errors.skills}
                                    info="Please use comma separated values (eg. HTML,CSS, Java)"
                                />
                                <TextFieldGroup
                                    placeholder="Github Username"
                                    onChange={this.onChange}
                                    value={this.state.githubusername}
                                    name="githubusername"
                                    error={errors.githubusername}
                                    info="If you want your lastest repos and a Github link, include your username"
                                />
                                <TextFieldGroup
                                    placeholder="Short Bio"
                                    onChange={this.onChange}
                                    value={this.state.bio}
                                    name="bio"
                                    error={errors.bio}
                                    info="Introduce yourself! Go wild!"
                                />

                                <div className="mb-3">

                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }));
                                        }}
                                    >
                                        Add Social Network Links
                                    </button>

                                </div>
                                {socialInputs}
                                <input
                                    type="submit"
                                    value="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(EditProfile)
);