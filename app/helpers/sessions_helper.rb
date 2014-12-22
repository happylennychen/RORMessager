module SessionsHelper
	def sign_in(user)
		session[:remember_token] = user.id
	end
	
	def signed_in?
		!current_user.nil?
	end
	
	def current_user
		User.find(session[:remember_token])
	end
	
	def sign_out
		session[:remember_token] = nil
	end
end
