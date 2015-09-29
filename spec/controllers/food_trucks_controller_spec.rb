require 'rails_helper'

RSpec.describe FoodTrucksController, type: :controller do

  it 'should return a json object if a address is provided' do
    get :index, address: '100 McAlister Street, San Francisco, CA'
    expect(response.content_type).to eq('application/json')
  end

  it 'should return 26 restaurants near 100 McAlister' do
    get :index, address: '100 McAlister Street, San Francisco, CA'
    expect(JSON.parse(response.body).length).to eq(26)
  end

  it 'should return a json object if coordinates are provided' do
    get :index, address: '[37.79276770594336,-122.40734273713315]'
    expect(response.content_type).to eq('application/json')
  end


  it 'should return 26 restaurants near [37.79276770594336,-122.40734273713315]' do
    get :index, address: '[37.79276770594336,-122.40734273713315]'
    expect(JSON.parse(response.body).length).to eq(26)
  end

  it 'should return a json object if an IP address is provided' do
    allow_any_instance_of(ActionDispatch::Request).to receive(:remote_ip).and_return('128.177.113.106')
    get :index
    expect(response.content_type).to eq('application/json')
  end

  it 'should return 26 restaurants near 128.177.113.106' do
    allow_any_instance_of(ActionDispatch::Request).to receive(:remote_ip).and_return('128.177.113.106')
    get :index
    expect(JSON.parse(response.body).length).to eq(26)
  end

  it 'should return an object of length 0 if outside San Francisco' do
    get :index, address: "[34.042985518676325,-118.2670575924567]"
    expect(JSON.parse(response.body).length).to eq(0)
  end
end
