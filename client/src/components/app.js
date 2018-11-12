import React, { Component } from 'react';
import * as axios from 'axios';
import Table from './tableComp';

export default class App extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            results: [],
            failed: false
        };
    
        this.fetchTitles = this.fetchTitles.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.saveSort = this.saveSort.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleKeyPress(event) {
        const { value } = this.state;
        if (event.key === 'Enter') {
            this.fetchTitles(value);
        };
    }

    saveSort(results) {
        this.setState({
            results: results
        });
    }

    fetchTitles(name) {
        axios.get(`/titles?input=${name}`, {
        })
        .then(response => {
            this.setState({results: response.data, failed: false});
        })
        .catch(error => {
            console.log(error);
            this.setState({results: null, failed: true});
        })
    }
    
    render() {
        const { value, results, failed } = this.state;
        let error = 'No results';
        if (failed) {
            error = 'Search failed';
        }

        return (
            <div className="mainDiv">
                <label>Search for movie titles</label>      
                <input type="text" required
                value={value} 
                onChange={this.handleChange}
                placeholder='Insert title here'
                onKeyPress={this.handleKeyPress}/>
                <span className="bar"></span>
                <button className="whiteButton" onClick={() => { this.fetchTitles(value)}}> Search </button>
                { results ?
                    <Table results={results} saveSort={this.saveSort}/>
                    :
                    <div className="movies">{error}</div>
                }
            </div>
        );
    };
};