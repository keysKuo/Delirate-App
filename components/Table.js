import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';

const TableComponent = ({ tracks, ...props }) => {
  const tableHead = ['Image', 'Status', 'Time', 'Location', 'Track Signer', 'Note'];
  const tableData = [
    // ['https://picsum.photos/100/100', 'Confirmed', '1699533195950913584', 'Store address', '653d18ac6c4d593e8018e27d', 'Create delivery'],
    // Add more rows as needed
  ];

console.log(tracks)
  tracks.forEach(track => {
    const { _image, _status, _note, _location, _track_signer, _timestamp } = track;
    tableData.push([_image, _status, _timestamp, _location, _track_signer, _note])
  })

  return (
    <ScrollView horizontal={true}>
      <View>
        <Table borderStyle={{ borderWidth: 2, borderColor: 'lightblue' }}>
          <Row
            data={tableHead}
            widthArr={[100, 100, 120, 150, 180, 200]} // Adjust the widths based on your design
            style={{ height: 40, backgroundColor: 'lightblue' }}
            textStyle={{ textAlign: 'center', fontWeight: 'bold' }}
          />
        </Table>
        <ScrollView style={{ marginTop: -1 }}>
          <Table borderStyle={{ borderWidth: 1, borderColor: 'lightblue' }}>
            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={[
                    <Image source={{ uri: rowData[0] }} style={{ width: 100, height: 100 }} />, // Image
                  rowData[1], // Status
                  rowData[2], // Time
                  rowData[3], // Location
                  rowData[4], // Track Signer
                  rowData[5], // Note
                ]}
                widthArr={[100, 100, 120, 150, 180, 200]} // Adjust the widths based on your design
                style={[{ height: 100, backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }]}
                textStyle={{ textAlign: 'center' }}
              />
            ))}
          </Table>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default TableComponent;
