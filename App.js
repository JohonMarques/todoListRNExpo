import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () =>{
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) =>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    console.log(itemsCopy);

  }

  return (
    <View style={styles.container}>
      {/*Titulo tarefas de hoje*/}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}> Tarefas de Hoje</Text>

        <View style={styles.items}>
          {/* aqui é onde as tarefas vao ficar */}

          {
            taskItems.map((item,index) => {
              return(
                <TouchableOpacity key={index} onPress={() => completeTask(index) }>
                  <Task  title={item} />
                </TouchableOpacity>
              )
            })
          }

          
        </View>
      </View>
    
      <KeyboardAvoidingView
        behavior={Platform.OS ==="ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      
      >
        <TextInput style={styles.input} placeholder={'Escreva uma tarefa'} value={task} onChangeText={text => setTask(text)}/>

        <TouchableOpacity onPress ={ () => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}> +</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEAED',
  },
  taskWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    width: 250,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  
});
