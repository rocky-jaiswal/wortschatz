require 'csv'

map = {}

CSV.foreach("./words_in.csv", { headers: :first_row, col_sep: ',' }) do |row|
  german = row['german'].strip
  english = row['english'].strip

  if (german.match(/^(der|die|das)\s(.*)/))
    md = german.match(/^(der|die|das)\s(.*)/)
    german = "#{md[2]} (#{md[1]})"
  end

  map[german.capitalize] = english
end

File.open("./words_out.csv", "w") do |f|
  map.keys.sort.each do |k|
    f.puts "#{k}\t#{map[k]}"
  end
end

puts map
