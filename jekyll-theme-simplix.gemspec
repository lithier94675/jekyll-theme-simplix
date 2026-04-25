# frozen_string_literal: true

Gem::Specification.new { |s|
	s.name = "jekyll-theme-simplix"
	s.version = "0.3.2"
	s.summary = "A simple Jekyll theme made with gradient colors"
	s.authors = ["lithier94675"]
	s.homepage = "https://lithier94675.github.io/jekyll-theme-simplix"
	s.license = "CC0-1.0"
	s.metadata = {
		"source_code_uri" => "https://github.com/lithier94675/jekyll-theme-simplix",
		"bug_tracker_uri" => "https://github.com/lithier94675/jekyll-theme-simplix/issues",
		"homepage_uri" => "https://lithier94675.github.io/jekyll-theme-simplix"
	}

	s.files = `git ls-files -z`.split("\x0").select { |f|
		f.match(%r!^((_includes|_layouts|_sass|assets)/|(LICENSE|README))!i)
	}


	s.required_ruby_version = ">= 2.7.0"
	s.add_runtime_dependency "jekyll", "~> 4.4"
	s.add_runtime_dependency "webrick", "~> 1.9"
}
