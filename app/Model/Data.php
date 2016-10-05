<?php
	namespace Model;

	use Mvc\Model;

	class Data extends Model {
		const PATH = __DIR__.'/../data';

		protected $name;
		protected $content;
		private $loaded = false;

		public function __construct($name) {
			parent::__construct([
				'name' => $name
			]);
		}

		public function &__get($property) {
			switch($property) {
				case 'name':
					return $this->getName();
					break;
				case 'content':
					return $this->getContent();
					break;
			}
		}

		protected function getPath() {
			return self::PATH.'/'.$this->name.'.json';
		}

		protected function &getName() {
			return $this->name;
		}

		protected function setName($name) {
			$this->name = $name;
		}

		protected function &getContent() {
			if(!$this->loaded) {
				$this->loadContent();
				$this->loaded = true;
			}
			return $this->content;
		}

		protected function setContent($content) {
			$this->content = $content;
		}

		private function loadContent() {
			$path = $this->getPath();

			if(is_readable($path)) $this->content = @json_decode(@file_get_contents($path));
			if($this->content === null) $this->content = [];
		}

		public function save() {
			$path = $this->getPath();
			return @file_put_contents($path, @json_encode($this->content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
		}
	}
?>
