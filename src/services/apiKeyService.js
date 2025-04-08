import { supabase } from '@/lib/supabase';

export const apiKeyService = {
  /**
   * Validates an API key by checking if it exists in the database
   * @param {string} apiKey - The API key to validate
   * @returns {Promise<boolean>} - True if the key is valid, false otherwise
   */
  async validateApiKey(apiKey) {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('id')
        .eq('key', apiKey)
        .single();

      if (error) {
        console.error('Error validating API key:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error in validateApiKey:', error);
      return false;
    }
  },

  /**
   * Fetches all API keys from the database
   * @returns {Promise<Array>} - Array of API keys
   */
  async fetchApiKeys() {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching API keys:', error);
      throw error;
    }

    return data || [];
  },

  /**
   * Creates a new API key
   * @param {Object} keyData - The API key data
   * @returns {Promise<Object>} - The created API key
   */
  async createApiKey(keyData) {
    // Format the data to match the database schema
    const formattedData = {
      name: keyData.name,
      key: `tvly-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      type: keyData.type.toLowerCase(),
      monthly_limit: keyData.monthlyLimit ? parseInt(keyData.monthlyLimit) : null,
      usage: 0,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('api_keys')
      .insert([formattedData])
      .select()
      .single();

    if (error) {
      console.error('Error creating API key:', error);
      throw error;
    }

    return data;
  },

  /**
   * Updates an existing API key
   * @param {string} id - The API key ID
   * @param {Object} updates - The updates to apply
   * @returns {Promise<Object>} - The updated API key
   */
  async updateApiKey(id, updates) {
    // Format the updates to match the database schema
    const formattedUpdates = {
      name: updates.name,
      type: updates.type.toLowerCase(),
      monthly_limit: updates.monthlyLimit ? parseInt(updates.monthlyLimit) : null,
    };

    const { data, error } = await supabase
      .from('api_keys')
      .update(formattedUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating API key:', error);
      throw error;
    }

    return data;
  },

  /**
   * Deletes an API key
   * @param {string} id - The API key ID
   * @returns {Promise<void>}
   */
  async deleteApiKey(id) {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting API key:', error);
      throw error;
    }
  }
}; 