/* jshint ignore: start */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./MyNavbar";
import Footer from "./Footer";

class ModulePage extends Component {
    state = {
        userStatus: "guest"
    };
    render() {
        return (
            <React.Fragment>
                <Navbar
                    role={this.props.role}
                    page="module"
                    userStatus={this.state.userStatus}
                />
                <div className="container">
                    <div className="mx-md-5">
                        <h1 className="text-center my-5 py-5">
                            {this.getContent(this.props.moduleName).title}
                            {console.log(this.props.moduleName)}
                        </h1>
                        {this.getContent(this.props.moduleName).body}
                        <div className="m-5">
                            <Link
                                to={this.props.moduleName + "/quiz"}
                                className="btn btn-danger col mt-3"
                            >
                                Quiz
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
    getContent(moduleName) {
        if (moduleName.toUpperCase() === "introduction".toUpperCase())
            return {
                title: "Introduction",
                body: (
                    <React.Fragment>
                        <h3 className="text-left">
                            What is ACADECMIC MISCONDUCT?
                        </h3>
                        <p>
                            “Academic Misconduct” in student life is generally
                            understood to occur when a student takes unfair
                            advantage in order to secure better grades than he
                            or she might otherwise earn. As a student you are
                            responsible for behaving with integrity, which means
                            you neither take information from others without
                            attribution or by unfair means, nor do you supply
                            course information to others. The University of
                            Winnipeg treats cases of plagiarism, cheating,
                            unwarranted collaboration, and other forms of
                            academic dishonesty very seriously. Honesty and
                            fairness are integral parts of the University's
                            mission. Any member of the University community who
                            violates these principles is dealt with as if he/she
                            is damaging the reputation and accomplishments of
                            the University itself.
                        </p>
                        <p>
                            The standards regulating research conduct that the
                            University of Winnipeg upholds are shared by other
                            reputable institutes of higher learning. The
                            specific policy and procedures governing Academic
                            Misconduct at our institution are laid out in the
                            University Calendar, in section 8, in pages that
                            cover “Student Discipline” --pages 26-31. This
                            information can be found online,
                            <a href="https://www.uwinnipeg.ca/academics/calendar/docs/regulationsandpolicies.pdf">
                                in the policies and procedures section
                            </a>
                            :
                        </p>
                        <p>
                            The Calendar outlines various forms of misconduct as
                            well as the steps that unfold when misconduct is
                            said to have occurred and cases are adjudicated.
                        </p>
                        <p>
                            To avoid misconduct situations, you are encouraged
                            to read
                            <a href="http://library.uwinnipeg.ca/help-with-research/index.html">
                                useful Library pages
                            </a>
                            online that set out research and documentation
                            procedures and resources:
                        </p>
                        <p>
                            You also have rights as a student. The University of
                            Winnipeg Student Association (UWSA) has prepared a
                            document that not only describes misconduct events
                            to avoid but also the steps you can take to find
                            support if you are charged with a misconduct
                            incident.
                        </p>
                        <p>
                            In this introductory module, you will be presented
                            with terms, definitions, proper practices, and links
                            to sites where you can find more information and
                            examples.
                        </p>
                        <p>
                            In module two, you will learn more about the
                            specific form of misconduct called
                            <strong> plagiarism</strong>. This involves taking
                            words and ideas of another and presenting them
                            without attribution as if they were your own. This
                            is misleading to readers. It also fails to give
                            credit to the scholar who developed the content and
                            to the source where the information appeared. On the
                            other hand, when you document your sources
                            correctly, you provide prospective readers with a
                            link to topical material.
                        </p>
                        <p>
                            To avoid plagiarism, you need to follow the
                            guidelines of a research manual and system.
                        </p>
                        <p>
                            Module three deals with avoiding
                            <strong> cheating</strong> in test and exam
                            situations. It also presents a view of unfair, and
                            often uninvited collaborations
                        </p>
                    </React.Fragment>
                )
            };
        else if (moduleName.toUpperCase() === "plagiarism".toUpperCase())
            return {
                title: "Plagiarism",
                body: "plagiarism"
            };
        else if (moduleName.toUpperCase() === "cheating".toUpperCase())
            return {
                title: "Cheating",
                body: "cheating"
            };
    }
    getModal() {
        if (this.state.loggedIn) return "ProfileModel";
        return "LoginModal";
    }
}

export default ModulePage;
