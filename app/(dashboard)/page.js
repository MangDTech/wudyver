'use client'
import { Fragment } from "react";
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';
import { StatRightTopIcon } from "widgets";
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

const Home = () => {
    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-20 shadow-sm">
                <Container fluid className="px-4">
                    <Row className="justify-content-between align-items-center">
                        <Col md={8}>
                            <h3 className="text-white mb-0">Projects</h3>
                        </Col>
                        <Col md={4} className="text-md-end">
                            <Link href="#" className="btn btn-light text-primary">Create New Project</Link>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container fluid className="mt-n22 px-4">
                <Row>
                    {ProjectsStatsData.map((item, index) => (
                        <Col xl={3} lg={6} md={12} xs={12} className="mt-4" key={index}>
                            <StatRightTopIcon info={item} />
                        </Col>
                    ))}
                </Row>

                <div className="my-6">
                    <ActiveProjects />
                </div>

                <Row className="my-6">
                    <Col xl={4} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
                        <TasksPerformance />
                    </Col>
                    <Col xl={8} lg={12} md={12} xs={12}>
                        <Teams />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}
export default Home;
