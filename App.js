import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Picker, Text, TextInput,View, TouchableOpacity, Button } from 'react-native';

class Abc extends Component{
  render(){
    return(
      <View>
        <Text>Name: { this.props.name }</Text>
        <Text>Country code: { this.props.code }</Text>
        <Text>Capital: { this.props.capital }</Text>
        <Text>Area: { this.props.area }</Text>
        <Text>Population: { this.props.population }</Text>
        <Text>Region: { this.props.region }</Text>
        <hr/>
      </View>
    )}}


function App() {

  let [content, setContent] = useState([]);
  let [countries, setCountries] = useState([]);
  let [text, setText] = useState('');
  let [select, setSelect] = useState('name');

  function add_countries () {

    fetch("https://restcountries.eu/rest/v2/", {
      "method": "GET",
  })

    .then(response => response.json())

    .then(response => {
      console.log(response);

      let countries = []
      for (let i = 0; i < response.length; i++){
        countries.push(response[i]);
      }
      
      setCountries(countries);

      let rows = [];
      if (countries.length > 0){
        //console.log(content.length);
        for (let j = 0; j < countries.length; j++){
          rows.push(<Abc name = {countries[j]['name']} code = {countries[j]['alpha3Code']} capital = {countries[j]['capital']} area = {countries[j]['area']} population = {countries[j]['population']} region = {countries[j]['region']} key = {j} />);
        }
        setContent(rows);
      }

    })

    .catch(err => {
      console.error(err);
    });

  }

  function show_countries(){
    let rows = [];
    if (countries.length > 0){
      //console.log(content.length);
      for (let j = 0; j < countries.length; j++){
        rows.push(<Abc name = {countries[j]['name']} code = {countries[j]['alpha3Code']} capital = {countries[j]['capital']} area = {countries[j]['area']} population = {countries[j]['population']} region = {countries[j]['region']} key = {j} />);
      }
      setContent(rows);
    }
  }

  function search (txt, slct) {
    console.log(countries);
     let flag = false;
     let obj = [];
     for (let i = 0; i < countries.length; i++){
       if (countries[i][slct] == txt){
         flag = true;
         obj.push(<Abc name = {countries[i]['name']} code = {countries[i]['alpha3Code']} capital = {countries[i]['capital']} area = {countries[i]['area']} population = {countries[i]['population']} region = {countries[i]['region']} key = {i} />);
     }
   setContent(obj);
   }
  //console.log(content);
 }

 useEffect( () => {
   add_countries();
}, [])


  return(
    <View style = {styles.container}>
      <Text style = {styles.txt}>Type the keyword that you are searching </Text>
      <TextInput style = {styles.input} onChangeText = {(input) => setText(input)} ></TextInput>

      <Text style = {styles.txt}>According to which parameter do you want the results to be filtered? </Text>
      <Picker style = {styles.picker}
      selectedValue={select}
      onValueChange={(itemValue) => setSelect(itemValue)}
      >
      <Picker.Item label="name" value="name" />
      <Picker.Item label="region" value="region" />
      <Picker.Item label="capital" value="capital" />
    </Picker>

      {/* <Button title = 'Search' style = {styles.btn} onPress = {() => search(text, select)} /> */}
      <TouchableOpacity style = {styles.btn} onPress = {() => search(text, select)} >
        <Text style = {styles.btnText} >Search</Text>
      </TouchableOpacity>

      <View style={styles.txt}> {content} </View>
      
      <TouchableOpacity style = {styles.btn} onPress = {() => show_countries()} >
        <Text style={styles.btnText}>All countries</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      marginTop: 15
  },

  input: {
    height: 40,
    width: 500,
    margin: 12,
    borderWidth: 1,
  },
  
  picker: {
    height: 40,
    width: 500,
    margin: 12,
    borderWidth: 1,
  },

  btn: {
    width: 100,
    backgroundColor: '#c60600',
    margin: 12,
    padding: 15
},

btnText: {
  textAlign: 'center',
  color: 'lavender'
},

txt: {
  margin: 12
}

});

export default App;