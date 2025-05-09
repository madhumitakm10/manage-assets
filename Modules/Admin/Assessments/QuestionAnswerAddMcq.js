import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { api_option,getToken,getUserType } from './../api/Helper';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

import { Modal } from "react-bootstrap";
import { Editor } from '@tinymce/tinymce-react';
import CommonService from "../../../../services/CommonService"; 

import Parser from "../../../Utils/Parser"; 

class QuestionAnswerAddMcq extends Component {
    constructor(props) {
        super(props);
        this.validatorQuestion = new SimpleReactValidator();

        this.state = {
            add_form_data:{
                question_id:(this.props.match?.params?.id!=undefined)?this.props.match?.params?.id:'',
                level_id:'',
                subject_id:'',
                question_name:'',
                option1:'',
                option2:'',
                option3:'',
                option4:'',
                answer:'option1',
                answer_instruction:'',
                marks:'',                
            },
            add_form_data1:{
                level_id:'',
                subject_id:'',
                question_name:'',
                option1:'',
                option2:'',
                option3:'',
                option4:'',
                answer:'option1',
                answer_instruction:'',
                marks:'',                
            },
            allSubjects: [],
            allLevels: []
        };
        //this.handleQuestionClose = this.handleQuestionClose.bind(this); 
        this.inputRef = React.createRef(null);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleEditorChangeQN = this.handleEditorChangeQN.bind(this);
        this.handleEditorChangeO1 = this.handleEditorChangeO1.bind(this);
        this.handleEditorChangeO2 = this.handleEditorChangeO2.bind(this);
        this.handleEditorChangeO3 = this.handleEditorChangeO3.bind(this);
        this.handleEditorChangeO4 = this.handleEditorChangeO4.bind(this);
        this.handleEditorChangeAE = this.handleEditorChangeAE.bind(this);             
    }

    componentDidMount() {
        var question_id = (this.props.match?.params?.id===undefined)?'':this.props.match?.params?.id;
        this.setState({add_form_data:{...this.state.add_form_data,'question_id':question_id}});
        this.get_mcq_detail(question_id);
        this.get_subject();
        this.get_level();
    }
  
    get_subject() {
        
        CommonService.getAll('subjects')
            .then(response => {
                this.setState({'allSubjects':response.data.data.subjects});
            })
            .catch(e => {
                toast.error("Network Error");
            });
    }

    get_level() {
        CommonService.getAll('levels')
            .then(response => {
                this.setState({'allLevels':response.data.data.levels});
            })
            .catch(e => {
                toast.error("Network Error");
            });
    }

    get_mcq_detail(id) {
        if(id){
            CommonService.getById('getMcqQuestionData', id)
                .then( response => {
                    console.log('jj');
                    if (response.data.success) {
                        //console.log(response.data.data.question_data.question_name);
                        this.setState({add_form_data:{'question_name': response.data.data.question_data.question_name, 'answer_description': response.data.data.question_data.answer_description, 'level_id': response.data.data.question_data.level_id, 'subject_id': response.data.data.question_data.subject_id, 'option1': response.data.data.question_data.option1, 'option2': response.data.data.question_data.option2,'option3': response.data.data.question_data.option3, 'option4': response.data.data.question_data.option4,
                        'answer_instruction': response.data.data.question_data.answer_instruction, 'marks': response.data.data.question_data.marks}
                        });
                        
                        this.setState({add_form_data1:{'question_name': response.data.data.question_data.question_name, 'answer_description': response.data.data.question_data.answer_description, 'level_id': response.data.data.question_data.level_id, 'subject_id': response.data.data.question_data.subject_id, 'option1': response.data.data.question_data.option1, 'option2': response.data.data.question_data.option2,'option3': response.data.data.question_data.option3, 'option4': response.data.data.question_data.option4,
                        'answer_instruction': response.data.data.question_data.answer_instruction, 'marks': response.data.data.question_data.marks}
                        });

                        
                    }
                })
                .catch(e => {
                    toast.error("Network Error");
                });
        }
    }
    // form submit event
    handleEditorChangeQN = async (event) => {
        //console.log(event.target.getContent());
        this.setState({add_form_data:{...this.state.add_form_data,'question_name': event.target.getContent()}});
    }
    handleEditorChangeO1 = (event) => {
        console.log('ll');
        console.log(this.state.add_form_data.option1);
        //console.log(event.target.getContent());
        this.setState({add_form_data:{...this.state.add_form_data,'option1': event.target.getContent()}});
    }
    handleEditorChangeO2 = (event) => {
        console.log(event.target.getContent());
        //console.log(event.target.getContent());
        this.setState({add_form_data:{...this.state.add_form_data,'option2': event.target.getContent()}});
    }
    handleEditorChangeO3 = (event) => {
        console.log(event.target.getContent());
        //console.log(event.target.getContent());
        this.setState({add_form_data:{...this.state.add_form_data,'option3': event.target.getContent()}});
    }
    handleEditorChangeO4 = (event) => {
        console.log(event.target.getContent());
        //console.log(event.target.getContent());
        this.setState({add_form_data:{...this.state.add_form_data,'option4': event.target.getContent()}});
    }
    handleEditorChangeAE = (event) => {
        console.log(event.target.getContent());
        //console.log(event.target.getContent());
        this.setState({add_form_data:{...this.state.add_form_data,'answer_instruction': event.target.getContent()}});
    }
    handleEditorChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({add_form_data:{...this.state.add_form_data,[name]: value}});    
    }

    // handleQuestionClose = () => {
    //     this.setState({showAddQuestion:false});
    // }

    async saveAddForm () {
        console.log(this.state.add_form_data);
        var question_id = (this.props.match?.params?.id===undefined)?'':this.props.match?.params?.id;
        // this.setState({add_form_data:{...this.state.add_form_data,'question_id': 179}});
        if (!this.validatorQuestion.allValid()) {
            this.validatorQuestion.showMessages();
            this.forceUpdate();
        } else {

            CommonService.updatePost('saveMcqQuestionData', question_id, this.state.add_form_data)
            .then(response => {
                console.log(response.data.success);
                if (response.data.success) {
                    toast(response.data.message);
                }
            })
            .catch(e => {
                toast.error("File not upload");
            });
            
        }
    }

    //view load
    render() {
        return (
            <>
                <div className="col-sm-12 text-center mt-100 ">
                    {/* Modal add start */}
                    <div className="row">
                    <div className="form-group col-sm-12 mb-3 questionDivWrap">
                        <div className='headingEdit'>Subject</div>                                    
                        
                            <select className="form-control" name='subject_id' onChange={this.handleEditorChange} placeholder='Select Subject' value={this.state.add_form_data.subject_id}> 
                                <option value="">Select Subject</option>
                                {
                                    this.state.allSubjects.map((subject, index) => {
                                        return <option key={index} value={subject.id}>{subject.name}</option>;
                                    })
                                }
                            </select>
                        {this.validatorQuestion.message('subject_id', this.state.add_form_data.subject_id, 'required')}
                    </div>  

                    <div className="form-group col-sm-12 mb-3 questionDivWrap">
                        <div className='headingEdit'>Level</div>                                    
                        
                            <select className="form-control" name='level_id' onChange={this.handleEditorChange} placeholder='Select Subject' value={this.state.add_form_data.level_id}> 
                            <option value="">Select Level</option>
                                    {
                                        this.state.allLevels.map((level, index) => {
                                            return <option key={index} value={level.id}>{level.name}</option>;
                                        })
                                    }
                            </select>
                        {this.validatorQuestion.message('level_id', this.state.add_form_data.level_id, 'required')}
                    </div>     
                    <div className="form-group col-sm-12 mb-3 questionDivWrap">
                        <div className='headingEdit'>Question Name</div>                                    
                        
                        <input type="text" className="form-control" placeholder="Question Name" name="question_name" value={this.state.add_form_data.question_name} onChange={this.handleEditorChange} />

                        {this.validatorQuestion.message('question_name', this.state.add_form_data.question_name, 'required')}
                    </div>  
                    <div className="form-group col-sm-12 mb-3 questionDivWrap">
                                    <div className='headingEdit'>Question Description</div>                                    
                                        <Editor
                name="question_description"
                initialValue={this.state.add_form_data1.question_description}
                apiKey="nyqxx7m1jj77evffmbgbi4rytfkny4ise02802v7702mxrea"
                onChange={this.handleEditorChangeQN}
                onInit={(evt, editor) => this.inputRef.current = editor}
                init={{
                height: 200,
                width : 800,
                menubar: true,
                automatic_uploads: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'image code'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' + ' | image | ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help' + '| tiny_mce_wiris_formulaEditor | tiny_mce_wiris_formulaEditorChemistry',

                file_picker_types: 'image',
                file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
            
                /*
                    Note: In modern browsers input[type="file"] is functional without
                    even adding it to the DOM, but that might not be the case in some older
                    or quirky browsers like IE, so you might want to add it to the DOM
                    just in case, and visually hide it. And do not forget do remove it
                    once you do not need it anymore.
                */
            
                input.onchange = function () {
                    var file = this.files[0];
            
                    var reader = new FileReader();
                    reader.onload = function () {
                    /*
                        Note: Now we need to register the blob in TinyMCEs image blob
                        registry. In the next release this part hopefully won't be
                        necessary, as we are looking to handle it internally.
                    */
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
            
                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };
            
                input.click();
                },
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' }

            }}
        />
                                        {this.validatorQuestion.message('question_description', this.state.add_form_data.question_name, 'required')}
                                    
                                    
                                </div>
                                <div className="form-group col-sm-12 mb-3 questionDivWrap">
                                    <div className='headingEdit'>Option1</div>
                                    
                                        <Editor
                name="option1"
                initialValue={this.state.add_form_data1.option1}
                apiKey="nyqxx7m1jj77evffmbgbi4rytfkny4ise02802v7702mxrea"
                onChange={this.handleEditorChangeO1}
                onInit={(evt, editor) => this.inputRef.current = editor}
                init={{
                height: 200,
                width : 800,
                menubar: true,
                automatic_uploads: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'image code'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' + ' | image | ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help' + '| tiny_mce_wiris_formulaEditor | tiny_mce_wiris_formulaEditorChemistry',

                file_picker_types: 'image',
                file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
            
                /*
                    Note: In modern browsers input[type="file"] is functional without
                    even adding it to the DOM, but that might not be the case in some older
                    or quirky browsers like IE, so you might want to add it to the DOM
                    just in case, and visually hide it. And do not forget do remove it
                    once you do not need it anymore.
                */
            
                input.onchange = function () {
                    var file = this.files[0];
            
                    var reader = new FileReader();
                    reader.onload = function () {
                    /*
                        Note: Now we need to register the blob in TinyMCEs image blob
                        registry. In the next release this part hopefully won't be
                        necessary, as we are looking to handle it internally.
                    */
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
            
                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };
            
                input.click();
                },
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' }

            }}
        />

                                        {this.validatorQuestion.message('option1', this.state.add_form_data.option1, 'required')}
                                </div>
                                <div className="form-group col-sm-12 mb-3 questionDivWrap">
                                <div className='headingEdit'>Option2</div>
                                    
                                        <Editor
                name="option2"
                initialValue={this.state.add_form_data1.option2}
                apiKey="nyqxx7m1jj77evffmbgbi4rytfkny4ise02802v7702mxrea"
                onChange={this.handleEditorChangeO2}
                onInit={(evt, editor) => this.inputRef.current = editor}
                init={{
                height: 200,
                width : 800,
                menubar: true,
                automatic_uploads: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'image code'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' + ' | image | ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help' + '| tiny_mce_wiris_formulaEditor | tiny_mce_wiris_formulaEditorChemistry',

                file_picker_types: 'image',
                file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
            
                /*
                    Note: In modern browsers input[type="file"] is functional without
                    even adding it to the DOM, but that might not be the case in some older
                    or quirky browsers like IE, so you might want to add it to the DOM
                    just in case, and visually hide it. And do not forget do remove it
                    once you do not need it anymore.
                */
            
                input.onchange = function () {
                    var file = this.files[0];
            
                    var reader = new FileReader();
                    reader.onload = function () {
                    /*
                        Note: Now we need to register the blob in TinyMCEs image blob
                        registry. In the next release this part hopefully won't be
                        necessary, as we are looking to handle it internally.
                    */
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
            
                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };
            
                input.click();
                },
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' }

            }}
        />

                                        {this.validatorQuestion.message('option2', this.state.add_form_data.option2, 'required')}
                                    
                                </div>
                                <div className="form-group col-sm-12 mb-3 questionDivWrap">
                                    <div className='headingEdit'>Option3</div>
                                    
                                        <Editor
                name="option3"
                initialValue={this.state.add_form_data1.option3}
                apiKey="nyqxx7m1jj77evffmbgbi4rytfkny4ise02802v7702mxrea"
                onChange={this.handleEditorChangeO3}
                onInit={(evt, editor) => this.inputRef.current = editor}
                init={{
                height: 200,
                width : 800,
                menubar: true,
                automatic_uploads: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'image code'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' + ' | image | ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help' + '| tiny_mce_wiris_formulaEditor | tiny_mce_wiris_formulaEditorChemistry',

                file_picker_types: 'image',
                file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
            
                /*
                    Note: In modern browsers input[type="file"] is functional without
                    even adding it to the DOM, but that might not be the case in some older
                    or quirky browsers like IE, so you might want to add it to the DOM
                    just in case, and visually hide it. And do not forget do remove it
                    once you do not need it anymore.
                */
            
                input.onchange = function () {
                    var file = this.files[0];
            
                    var reader = new FileReader();
                    reader.onload = function () {
                    /*
                        Note: Now we need to register the blob in TinyMCEs image blob
                        registry. In the next release this part hopefully won't be
                        necessary, as we are looking to handle it internally.
                    */
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
            
                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };
            
                input.click();
                },
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' }

            }}
        />

                                        {this.validatorQuestion.message('option3', this.state.add_form_data.option2, 'required')}
                                </div>
                                <div className="form-group col-sm-12 mb-3 questionDivWrap">
                                    <div className='headingEdit'>Option4</div>
                                    
                                        <Editor
                name="option4"
                initialValue={this.state.add_form_data1.option4}
                apiKey="nyqxx7m1jj77evffmbgbi4rytfkny4ise02802v7702mxrea"
                onChange={this.handleEditorChangeO4}
                onInit={(evt, editor) => this.inputRef.current = editor}
                init={{
                height: 200,
                width : 800,
                menubar: true,
                automatic_uploads: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'image code'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' + ' | image | ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help' + '| tiny_mce_wiris_formulaEditor | tiny_mce_wiris_formulaEditorChemistry',

                file_picker_types: 'image',
                file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
            
                /*
                    Note: In modern browsers input[type="file"] is functional without
                    even adding it to the DOM, but that might not be the case in some older
                    or quirky browsers like IE, so you might want to add it to the DOM
                    just in case, and visually hide it. And do not forget do remove it
                    once you do not need it anymore.
                */
            
                input.onchange = function () {
                    var file = this.files[0];
            
                    var reader = new FileReader();
                    reader.onload = function () {
                    /*
                        Note: Now we need to register the blob in TinyMCEs image blob
                        registry. In the next release this part hopefully won't be
                        necessary, as we are looking to handle it internally.
                    */
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
            
                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };
            
                input.click();
                },
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' }

            }}
        />

                                        {this.validatorQuestion.message('option4', this.state.add_form_data.option4, 'required')}
                                </div>
                                <div className="form-group col-sm-12 mb-3 questionDivWrap">
                                    <div className='headingEdit'>Answer</div>
                                    <select className="form-control" name='answer_description' onChange={this.handleEditorChange} placeholder='Select Answer' value={this.state.add_form_data.answer_description}> 
                                        <option value=''>Select Option</option>
                                        <option value='option1' >Option1</option>
                                        <option value='option2'>Option2</option>
                                        <option value='option3'>Option3</option>
                                        <option value='option4'>Option4</option>
                                    </select>
                                    {this.validatorQuestion.message('answer', this.state.add_form_data.answer_description, 'required')}
                                </div>
                                <div className="form-group col-sm-12 mb-3 questionDivWrap">
                                    <div className='headingEdit'>Answer Explanation</div>
                                    
                                        <Editor
                name="answer_instruction"
                initialValue={this.state.add_form_data1.answer_instruction}
                apiKey="nyqxx7m1jj77evffmbgbi4rytfkny4ise02802v7702mxrea"
                onChange={this.handleEditorChangeAE}
                onInit={(evt, editor) => this.inputRef.current = editor}
                init={{
                height: 200,
                width : 800,
                menubar: true,
                automatic_uploads: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'image code'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' + ' | image | ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help' + '| tiny_mce_wiris_formulaEditor | tiny_mce_wiris_formulaEditorChemistry',

                file_picker_types: 'image',
                file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
            
                /*
                    Note: In modern browsers input[type="file"] is functional without
                    even adding it to the DOM, but that might not be the case in some older
                    or quirky browsers like IE, so you might want to add it to the DOM
                    just in case, and visually hide it. And do not forget do remove it
                    once you do not need it anymore.
                */
            
                input.onchange = function () {
                    var file = this.files[0];
            
                    var reader = new FileReader();
                    reader.onload = function () {
                    /*
                        Note: Now we need to register the blob in TinyMCEs image blob
                        registry. In the next release this part hopefully won't be
                        necessary, as we are looking to handle it internally.
                    */
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
            
                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                };
            
                input.click();
                },
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' }
            }}
        />

                                        {/* {this.validatorQuestion.message('answer_instruction', this.state.add_form_data.answer_instruction, 'required')} */}
                                </div>
                                <div className="form-group col-sm-12 mb-3 questionDivWrap">
                                    <div className='headingEdit'>Marks</div>
                                        <input name="marks" type='number' min={0} onChange={this.handleEditorChange} className="form-control" value={this.state.add_form_data.marks} />
                                        {this.validatorQuestion.message('marks', this.state.add_form_data.marks, 'required')}
                                </div>
                                <div className="form-group col-sm-12 mb-3">
                                    <div className="form-group">
                                        <button type="button" onClick={this.saveAddForm.bind(this)} className="btn btn-primary mr-2">Save</button>                           
                                    </div>
                                </div>
                            </div>
                                
                    {/* Modal add end */}
                </div>   
            </>
        );
    }
}

export default QuestionAnswerAddMcq;
