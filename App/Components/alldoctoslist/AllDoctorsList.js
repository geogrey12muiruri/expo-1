import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import AllDoctorCardItem from '../common/AllDoctorCardItem'; // Adjust the import path as needed

const AllDoctorsList = ({ doctorList }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <AllDoctorCardItem doctor={item} />
      </View>
    );
  };

  return (
    <FlatList
      data={doctorList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

AllDoctorsList.propTypes = {
  doctorList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      attributes: PropTypes.shape({
        Name: PropTypes.string,
        Year_of_Experience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        categories: PropTypes.shape({
          data: PropTypes.arrayOf(
            PropTypes.shape({
              attributes: PropTypes.shape({
                name: PropTypes.string
              })
            })
          )
        }),
        image: PropTypes.shape({
          data: PropTypes.shape({
            attributes: PropTypes.shape({
              formats: PropTypes.shape({
                thumbnail: PropTypes.shape({
                  url: PropTypes.string
                })
              })
            })
          })
        })
      })
    })
  )
};

AllDoctorsList.defaultProps = {
  doctorList: []
};

export default AllDoctorsList;