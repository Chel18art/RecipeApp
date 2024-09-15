import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabaseClient'; // Import your Supabase client

const DashboardScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample recipe data with URLs (replace this with actual data from your backend)
  const recipes = [
    { id: '1', name: 'Spaghetti Carbonara', image: 'https://th.bing.com/th/id/OIP.tC1WKrOpDI7b6DwHbEutcwAAAA?rs=1&pid=ImgDetMain', url: 'https://www.returntothekitchen.com/easy-homemade-pasta-carbonara/' },
    { id: '2', name: 'Chicken Alfredo', image: 'https://th.bing.com/th/id/OIP.LzbvMmKys54tSxgfX53_RQAAAA?rs=1&pid=ImgDetMain', url: 'https://mrsfriday.com/chicken-alfredo-recipe-i-wash-you-dry.html' },
    { id: '3', name: 'Beef Stroganoff', image: 'https://i1.wp.com/www.cookingwithbooks.net/wp-content/uploads/2018/01/Beef-Stroganoff-3.jpg?ssl=1', url: 'https://www.cookingwithbooks.net/2018/02/simple-beef-stroganoff.html' },
    { id: '4', name: 'Vegetable Stir Fry', image: 'https://th.bing.com/th/id/OIP.r-Cwcy9B6vk8N6J8IkxDTQAAAA?rs=1&pid=ImgDetMain', url: 'https://natashaskitchen.com/vegetable-stir-fry/' },
    { id: '5', name: 'Grilled Salmon', image: 'https://www.cookingclassy.com/wp-content/uploads/2018/05/grilled-salmon-3.jpg', url: 'https://www.cookingclassy.com/5-ingredient-marinated-grilled-salmon/' },
    { id: '6', name: 'Taco Salad', image: 'https://th.bing.com/th/id/OIP.H1Pb09Hi7bioJQAEmEUEdAAAAA?rs=1&pid=ImgDetMain', url: 'https://www.cookingclassy.com/taco-salad/' },
    ];


  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch the user session
        console.log('Fetching user session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        // Log the session data and any error
        console.log('Session Data:', session);
        if (error) {
          console.error('Error fetching session:', error.message);
          setLoading(false);
          return;
        }

        if (session && session.user) {
          setUser(session.user);
          console.log('User:', session.user);
        } else {
          console.log('No active session');
        }
      } catch (err) {
        console.error('Error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Function to handle recipe press
  const handlePress = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  // Function to handle category press
  const handleCategoryPress = (category) => {
    const categoryUrls = {
      'Italian': 'https://www.tasteofhome.com/collection/favorite-italian-recipes/',
      'Fast Food': 'https://www.tasteofhome.com/collection/best-30-minute-meals/',
      'Vegetarian': 'https://www.bonappetit.com/recipes/vegetarian/slideshow/easy-vegetarian-dinner-recipes',
      'Asian': 'https://cookingchew.com/asian-recipes.html',
    };
    const url = categoryUrls[category];
    if (url) {
      Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    }
  };

  // URL for the "Search Recipes" button
  const allRecipesUrl = 'https://www.allrecipes.com/recipes/';

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome{user ? `, ${user.email.split('@')[0]}` : ''}</Text>
          <Text style={styles.subtitle}>Transform simple ingredients into extraordinary experiences</Text>
        </View>

        {/* Featured Recipes */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Recipes</Text>
          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recipeCard}
                onPress={() => handlePress(item.url)}
              >
                <Image source={{ uri: item.image }} style={styles.recipeImage} />
                <Text style={styles.recipeName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress('Italian')}>
              <Ionicons name="pizza" size={30} color="#fff" />
              <Text style={styles.categoryText}>Italian</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress('Fast Food')}>
              <Ionicons name="fast-food" size={30} color="#fff" />
              <Text style={styles.categoryText}>Fast Food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress('Vegetarian')}>
              <Ionicons name="leaf" size={30} color="#fff" />
              <Text style={styles.categoryText}>Vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress('Asian')}>
              <Ionicons name="restaurant" size={30} color="#fff" />
              <Text style={styles.categoryText}>Asian</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => Linking.openURL(allRecipesUrl).catch((err) => console.error('Failed to open URL:', err))}>
            <Ionicons name="search" size={30} color="#fff" />
            <Text style={styles.actionText}>All Recipes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Favorites')}>
            <Ionicons name="heart" size={30} color="#fff" />
            <Text style={styles.actionText}>My Favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person" size={30} color="#fff" />
            <Text style={styles.actionText}>My Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set the background color to white
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  featuredSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeCard: {
    marginRight: 10,
    width: 150,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  recipeImage: {
    width: '100%',
    height: 100,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  categoriesSection: {
    marginBottom: 30,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#FF5722',
    borderRadius: 15,
    width: '48%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  bottomActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#FF5722',
    borderRadius: 15,
    width: '30%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
});

export default DashboardScreen;
