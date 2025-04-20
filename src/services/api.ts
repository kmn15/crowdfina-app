import { supabase } from '../lib/supabase';
import type { Property } from '../types/property';

export const api = {
  async getProperties() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Failed to fetch properties: ' + error.message);
    }

    return data;
  },

  async getProperty(id: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error('Failed to fetch property: ' + error.message);
    }

    return data;
  },

  // Add a new property
  async addProperty(property: Omit<Property, 'id'>) {
    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select()
      .single();

    if (error) {
      throw new Error('Failed to add property: ' + error.message);
    }

    return data;
  },

  // Update a property
  async updateProperty(id: string, updates: Partial<Property>) {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error('Failed to update property: ' + error.message);
    }

    return data;
  },

  // Delete a property
  async deleteProperty(id: string) {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error('Failed to delete property: ' + error.message);
    }
  }
}; 