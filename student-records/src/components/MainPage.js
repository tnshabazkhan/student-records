import React, { Fragment, useState } from 'react';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Modal, Form } from 'react-bootstrap';

const { SearchBar } = Search;

export default () => {

    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(0);
    const [name, setName] = useState("");
    const [rollNo, setRollNumber] = useState("");
    const [age, setAge] = useState(10);
    const [gender, setGender] = useState("Male");
    const [isUpdate, setIsUpdate] = useState(0);
    const [updateRollNo, setUpdateRollNo] = useState("");
    
    const columns = [{
        dataField: 'rollNumber',
        text: 'Roll No'
    }, {
        dataField: 'name',
        text: ' Student Name'
    }, {
        dataField: 'age',
        text: 'Age'
    }, {
        dataField: 'gender',
        text: 'Gender',
    },
        {
        dataField: 'actions',
        text: 'Actions'
    }
    ];

    const addStudent = () => {
        setStudents([...students, { name: name, rollNumber: rollNo, age: age, gender: gender, actions: <div><Button variant="primary" onClick={()=>openUpdateModal(rollNo, name, age, gender)}>Update</Button> <Button variant="danger" onClick={()=> deleteStudent(rollNo)}>Delete</Button> </div> }]);
        clearDataAndCloseModal();
    }
    
    const clearDataAndCloseModal = () => {
        setName("");
        setRollNumber("");
        setAge(10);
        setGender("Male");
        setShowModal(0);
    }

    const deleteStudent = (rollNum) => {
        setStudents(currentItems => currentItems.filter((item) => item.rollNumber !== rollNum));
    }

    const openUpdateModal = (rollNo, name, age, gender) => {
        setName(name);
        setRollNumber(rollNo);
        setAge(age);
        setGender(gender);
        setUpdateRollNo(rollNo);
        setIsUpdate(1);
        setShowModal(1);
    }

    const updateStudent = () => {
        setStudents(currentItems => currentItems.map(el => (el.rollNumber === updateRollNo ? { name: name, rollNumber: rollNo, age: age, gender: gender, actions: <div><Button variant="primary" onClick={()=>openUpdateModal(rollNo, name, age, gender)}>Update</Button> <Button variant="danger" onClick={()=> deleteStudent(rollNo)}>Delete</Button> </div> } : el)));
        clearDataAndCloseModal();
    }

    return (
        <Fragment>
            <ToolkitProvider
                keyField="id"
                data={students}
                columns={columns}
                search
            >
                {
                    props => (
                        <div>
                            <h1 style={{ color: "white", backgroundColor: "black" }}>Student Records</h1>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <SearchBar placeholder="Search" style={{ marginLeft: "40px" }} {...props.searchProps} />
                                <Button variant="primary" onClick={() => {setIsUpdate(0); setShowModal(1)}}>Add Student</Button>
                            </div>
                            <hr />
                            <BootstrapTable {...props.baseProps} keyField='id' data={students} columns={columns} striped={true} hover={true} />
                        </div>
                    )
                }
            </ToolkitProvider>
            <Modal show={showModal} onHide={() => clearDataAndCloseModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>{!isUpdate ? "Add Student" : "Update Student"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formRoolNo">
                            <Form.Label>Roll Number</Form.Label>
                            <Form.Control type="text" value={rollNo} placeholder="Enter Roll No" onChange={(e) => setRollNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" value={age} placeholder="Enter age" min="]3" max="80" onChange={(e) => setAge(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={!isUpdate ? addStudent : updateStudent}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}