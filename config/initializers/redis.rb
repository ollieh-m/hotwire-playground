Rails.application.configure do
  Redis.current = Redis.new(config_for(:redis))
end
